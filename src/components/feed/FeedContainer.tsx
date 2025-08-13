import { useEffect, useRef, useCallback } from 'react';
import { usePosts } from '@/hooks/usePosts';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/components/ui/toast-provider';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ErrorDisplay } from '@/components/ui/error-boundary';
import { PostSkeletonList } from '@/components/ui/post-skeleton';
import PostCard from './PostCard';
import { Loader2, RefreshCw } from 'lucide-react';
import { PostType } from '@/types';

interface FeedContainerProps {
  type?: PostType;
  authorId?: string;
  userId?: string;
  filter?: 'liked' | 'saved' | 'authored';
  searchQuery?: string;
  className?: string;
  showWelcome?: boolean;
}

const FeedContainer = ({
  type,
  authorId,
  userId,
  filter,
  searchQuery,
  className = '',
  showWelcome = false
}: FeedContainerProps) => {
  const { user } = useAuth();
  const { success, error: showError } = useToast();
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const { 
    posts, 
    loading, 
    error, 
    hasMore, 
    loadMore, 
    refreshPosts,
    likePost,
    unlikePost,
    savePost,
    unsavePost,
    addComment,
    sharePost
  } = usePosts({
    type,
    authorId,
    userId,
    filter,
    searchQuery,
    limit: 10,
    autoLoad: true
  });

  // Scroll infinito usando Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting && hasMore && !loading) {
          loadMore();
        }
      },
      {
        threshold: 0.1,
        rootMargin: '100px'
      }
    );

    const currentRef = loadMoreRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [hasMore, loading, loadMore]);

  const handleComment = useCallback((postId: string) => {
    // Scroll suave para o post
    const postElement = document.getElementById(`post-${postId}`);
    if (postElement) {
      postElement.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'center' 
      });
    }
  }, []);

  const handleShare = useCallback(async (postId: string) => {
    if (!user) {
      showError('Você precisa estar logado para compartilhar');
      return;
    }
    
    try {
      const shareUrl = await sharePost(postId, user.id);
      if (shareUrl) {
        success('Link copiado para a área de transferência!');
      }
    } catch (error) {
      showError('Erro ao compartilhar post');
    }
  }, [user, sharePost, success, showError]);

  const handleRefresh = useCallback(() => {
    refreshPosts();
  }, [refreshPosts]);

  const getEmptyStateMessage = () => {
    if (searchQuery) {
      return `Nenhum resultado encontrado para "${searchQuery}"`;
    }
    
    if (filter === 'liked') {
      return 'Você ainda não curtiu nenhum post';
    }
    
    if (filter === 'saved') {
      return 'Você ainda não salvou nenhum post';
    }
    
    if (filter === 'authored') {
      return 'Você ainda não criou nenhum post';
    }
    
    if (type) {
      const typeLabels = {
        'synopsis': 'sinopses',
        'poster': 'cartazes',
        'ai-image': 'imagens de IA'
      };
      return `Nenhuma ${typeLabels[type]} encontrada`;
    }
    
    return 'Nenhum post encontrado';
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Mensagem de boas-vindas */}
      {showWelcome && user && (
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold mb-2">
                  Bem-vindo, {user.name}! 👋
                </h2>
                <p className="text-muted-foreground">
                  Explore o feed com posts de criação cinematográfica. Curta, salve e comente!
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleRefresh}
                disabled={loading}
                className="flex items-center space-x-2"
              >
                <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                <span>Atualizar</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Erro */}
      {error && (
        <ErrorDisplay
          title="Erro ao carregar posts"
          message={error}
          onRetry={handleRefresh}
          onGoHome={() => window.location.href = '/Roteirum/feed'}
        />
      )}

      {/* Loading inicial */}
      {loading && posts.length === 0 && (
        <PostSkeletonList count={3} />
      )}

      {/* Posts */}
      {posts.map((post, index) => (
        <div key={post.id} id={`post-${post.id}`}>
          <PostCard
            post={post}
            currentUserId={user?.id}
            onLike={likePost}
            onUnlike={unlikePost}
            onSave={savePost}
            onUnsave={unsavePost}
            onComment={handleComment}
            onShare={handleShare}
          />
        </div>
      ))}

      {/* Elemento para scroll infinito */}
      {hasMore && posts.length > 0 && (
        <div ref={loadMoreRef} className="flex justify-center py-6">
          {loading ? (
            <div className="flex items-center space-x-2 text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Carregando mais posts...</span>
            </div>
          ) : (
            <Button
              variant="outline"
              onClick={loadMore}
              className="flex items-center space-x-2"
            >
              <span>Carregar mais posts</span>
            </Button>
          )}
        </div>
      )}

      {/* Estado vazio */}
      {!loading && posts.length === 0 && !error && (
        <Card>
          <CardContent className="text-center py-12">
            <div className="max-w-md mx-auto">
              <div className="text-6xl mb-4">📽️</div>
              <h3 className="text-lg font-semibold mb-2">
                {getEmptyStateMessage()}
              </h3>
              <p className="text-muted-foreground mb-6">
                {searchQuery 
                  ? 'Tente usar termos diferentes ou explore outros posts.'
                  : 'Que tal começar explorando o feed principal?'
                }
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button onClick={handleRefresh} variant="outline">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Atualizar
                </Button>
                {searchQuery && (
                  <Button 
                    onClick={() => window.location.href = '/Roteirum/feed'}
                    variant="default"
                  >
                    Ver todos os posts
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Fim do feed */}
      {!hasMore && posts.length > 0 && (
        <div className="text-center py-8">
          <div className="inline-flex items-center space-x-2 text-muted-foreground">
            <div className="h-px bg-border flex-1 w-16"></div>
            <span className="text-sm">Você chegou ao fim! 🎬</span>
            <div className="h-px bg-border flex-1 w-16"></div>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            {posts.length} post{posts.length !== 1 ? 's' : ''} carregado{posts.length !== 1 ? 's' : ''}
          </p>
        </div>
      )}
    </div>
  );
};

export default FeedContainer;