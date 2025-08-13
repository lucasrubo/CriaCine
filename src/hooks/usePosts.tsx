import { useState, useEffect, useCallback } from 'react';
import { Post, PostType, PaginatedResponse } from '@/types';
import { 
  mockPosts, 
  getPostsByType, 
  getPostsByAuthor, 
  getLikedPostsByUser, 
  getSavedPostsByUser, 
  searchPosts, 
  getTopPostsThisMonth 
} from '@/data/mockPosts';

interface UsePostsOptions {
  type?: PostType;
  authorId?: string;
  userId?: string;
  filter?: 'liked' | 'saved' | 'authored';
  searchQuery?: string;
  limit?: number;
  autoLoad?: boolean;
}

interface UsePostsReturn {
  posts: Post[];
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  totalPosts: number;
  loadPosts: () => Promise<void>;
  loadMore: () => Promise<void>;
  refreshPosts: () => Promise<void>;
  likePost: (postId: string, userId: string) => Promise<void>;
  unlikePost: (postId: string, userId: string) => Promise<void>;
  savePost: (postId: string, userId: string) => Promise<void>;
  unsavePost: (postId: string, userId: string) => Promise<void>;
  addComment: (postId: string, content: string, userId: string) => Promise<any>;
  sharePost: (postId: string, userId: string) => Promise<string | null>;
}

// Simula delay de rede
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const usePosts = (options: UsePostsOptions = {}): UsePostsReturn => {
  const {
    type,
    authorId,
    userId,
    filter,
    searchQuery,
    limit = 10,
    autoLoad = true
  } = options;

  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPosts, setTotalPosts] = useState(0);

  // Função para filtrar posts baseado nas opções
  const getFilteredPosts = useCallback((): Post[] => {
    let filteredPosts = [...mockPosts];

    // Filtro por tipo
    if (type) {
      filteredPosts = getPostsByType(type);
    }

    // Filtro por autor
    if (authorId) {
      filteredPosts = getPostsByAuthor(authorId);
    }

    // Filtros específicos do usuário
    if (userId && filter) {
      switch (filter) {
        case 'liked':
          filteredPosts = getLikedPostsByUser(userId);
          break;
        case 'saved':
          filteredPosts = getSavedPostsByUser(userId);
          break;
        case 'authored':
          filteredPosts = getPostsByAuthor(userId);
          break;
      }
    }

    // Filtro por busca
    if (searchQuery) {
      filteredPosts = searchPosts(searchQuery);
    }

    // Ordena por data (mais recentes primeiro)
    return filteredPosts.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }, [type, authorId, userId, filter, searchQuery]);

  // Carrega posts iniciais
  const loadPosts = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      await delay(500); // Simula latência

      const allFilteredPosts = getFilteredPosts();
      const startIndex = 0;
      const endIndex = Math.min(limit, allFilteredPosts.length);
      const paginatedPosts = allFilteredPosts.slice(startIndex, endIndex);

      setPosts(paginatedPosts);
      setTotalPosts(allFilteredPosts.length);
      setHasMore(endIndex < allFilteredPosts.length);
      setPage(1);
    } catch (err) {
      setError('Erro ao carregar posts');
    } finally {
      setLoading(false);
    }
  }, [getFilteredPosts, limit]);

  // Carrega mais posts (paginação)
  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);

    try {
      await delay(300);

      const allFilteredPosts = getFilteredPosts();
      const startIndex = page * limit;
      const endIndex = Math.min(startIndex + limit, allFilteredPosts.length);
      const newPosts = allFilteredPosts.slice(startIndex, endIndex);

      setPosts(prev => [...prev, ...newPosts]);
      setHasMore(endIndex < allFilteredPosts.length);
      setPage(prev => prev + 1);
    } catch (err) {
      setError('Erro ao carregar mais posts');
    } finally {
      setLoading(false);
    }
  }, [getFilteredPosts, limit, page, loading, hasMore]);

  // Recarrega posts
  const refreshPosts = useCallback(async () => {
    setPage(1);
    await loadPosts();
  }, [loadPosts]);

  // Curtir post
  const likePost = useCallback(async (postId: string, userId: string) => {
    try {
      const { postService } = await import('@/data/postService');
      const response = await postService.likePost(postId, userId);
      
      if (response.success && response.data) {
        setPosts(prev => prev.map(post => 
          post.id === postId ? response.data : post
        ));
      } else {
        setError(response.message || 'Erro ao curtir post');
      }
    } catch (err) {
      setError('Erro ao curtir post');
    }
  }, []);

  // Descurtir post
  const unlikePost = useCallback(async (postId: string, userId: string) => {
    try {
      const { postService } = await import('@/data/postService');
      const response = await postService.unlikePost(postId, userId);
      
      if (response.success && response.data) {
        setPosts(prev => prev.map(post => 
          post.id === postId ? response.data : post
        ));
      } else {
        setError(response.message || 'Erro ao descurtir post');
      }
    } catch (err) {
      setError('Erro ao descurtir post');
    }
  }, []);

  // Salvar post
  const savePost = useCallback(async (postId: string, userId: string) => {
    try {
      const { postService } = await import('@/data/postService');
      const response = await postService.savePost(postId, userId);
      
      if (response.success && response.data) {
        setPosts(prev => prev.map(post => 
          post.id === postId ? response.data : post
        ));
      } else {
        setError(response.message || 'Erro ao salvar post');
      }
    } catch (err) {
      setError('Erro ao salvar post');
    }
  }, []);

  // Remover post dos salvos
  const unsavePost = useCallback(async (postId: string, userId: string) => {
    try {
      const { postService } = await import('@/data/postService');
      const response = await postService.unsavePost(postId, userId);
      
      if (response.success && response.data) {
        setPosts(prev => prev.map(post => 
          post.id === postId ? response.data : post
        ));
      } else {
        setError(response.message || 'Erro ao remover post dos salvos');
      }
    } catch (err) {
      setError('Erro ao remover post dos salvos');
    }
  }, []);

  // Carrega posts automaticamente quando as opções mudam
  useEffect(() => {
    if (autoLoad) {
      loadPosts();
    }
  }, [loadPosts, autoLoad]);

  // Adicionar comentário
  const addComment = useCallback(async (postId: string, content: string, userId: string) => {
    try {
      const { postService } = await import('@/data/postService');
      const response = await postService.addComment({
        postId,
        authorId: userId,
        content
      });
      
      if (response.success && response.data) {
        setPosts(prev => prev.map(post => 
          post.id === postId ? response.data.post : post
        ));
        return response.data.comment;
      } else {
        setError(response.message || 'Erro ao adicionar comentário');
        return null;
      }
    } catch (err) {
      setError('Erro ao adicionar comentário');
      return null;
    }
  }, []);

  // Compartilhar post
  const sharePost = useCallback(async (postId: string, userId: string) => {
    try {
      const { postService } = await import('@/data/postService');
      const response = await postService.sharePost(postId, userId);
      
      if (response.success) {
        return response.data?.shareUrl;
      } else {
        setError(response.message || 'Erro ao compartilhar post');
        return null;
      }
    } catch (err) {
      setError('Erro ao compartilhar post');
      return null;
    }
  }, []);

  return {
    posts,
    loading,
    error,
    hasMore,
    totalPosts,
    loadPosts,
    loadMore,
    refreshPosts,
    likePost,
    unlikePost,
    savePost,
    unsavePost,
    addComment,
    sharePost
  };
};

// Hook específico para ranking
export const useTopPosts = (limit: number = 100) => {
  const [topPosts, setTopPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);

  const loadTopPosts = useCallback(async () => {
    setLoading(true);
    try {
      await delay(300);
      const posts = getTopPostsThisMonth(limit);
      setTopPosts(posts);
    } catch (err) {
      console.error('Erro ao carregar top posts:', err);
    } finally {
      setLoading(false);
    }
  }, [limit]);

  useEffect(() => {
    loadTopPosts();
  }, [loadTopPosts]);

  return { topPosts, loading, refreshTopPosts: loadTopPosts };
};