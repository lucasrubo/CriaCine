import { Post, Comment, User } from '@/types';
import { mockPosts } from './mockPosts';
import { findUserById } from './mockUsers';
import { generateId } from '@/utils/validation';

// Simula delay de rede
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export interface AddCommentRequest {
  postId: string;
  authorId: string;
  content: string;
}

export interface InteractionResponse {
  success: boolean;
  message?: string;
  data?: any;
}

export const postService = {
  // Curtir post
  async likePost(postId: string, userId: string): Promise<InteractionResponse> {
    await delay(200);

    const postIndex = mockPosts.findIndex(p => p.id === postId);
    if (postIndex === -1) {
      return { success: false, message: 'Post não encontrado' };
    }

    const post = mockPosts[postIndex];
    if (post.likedBy.includes(userId)) {
      return { success: false, message: 'Post já foi curtido' };
    }

    // Atualiza o post
    mockPosts[postIndex] = {
      ...post,
      likes: post.likes + 1,
      likedBy: [...post.likedBy, userId],
      updatedAt: new Date()
    };

    return { 
      success: true, 
      message: 'Post curtido com sucesso',
      data: mockPosts[postIndex]
    };
  },

  // Descurtir post
  async unlikePost(postId: string, userId: string): Promise<InteractionResponse> {
    await delay(200);

    const postIndex = mockPosts.findIndex(p => p.id === postId);
    if (postIndex === -1) {
      return { success: false, message: 'Post não encontrado' };
    }

    const post = mockPosts[postIndex];
    if (!post.likedBy.includes(userId)) {
      return { success: false, message: 'Post não foi curtido' };
    }

    // Atualiza o post
    mockPosts[postIndex] = {
      ...post,
      likes: Math.max(0, post.likes - 1),
      likedBy: post.likedBy.filter(id => id !== userId),
      updatedAt: new Date()
    };

    return { 
      success: true, 
      message: 'Curtida removida com sucesso',
      data: mockPosts[postIndex]
    };
  },

  // Salvar post
  async savePost(postId: string, userId: string): Promise<InteractionResponse> {
    await delay(200);

    const postIndex = mockPosts.findIndex(p => p.id === postId);
    if (postIndex === -1) {
      return { success: false, message: 'Post não encontrado' };
    }

    const post = mockPosts[postIndex];
    if (post.savedBy.includes(userId)) {
      return { success: false, message: 'Post já foi salvo' };
    }

    // Atualiza o post
    mockPosts[postIndex] = {
      ...post,
      saves: post.saves + 1,
      savedBy: [...post.savedBy, userId],
      updatedAt: new Date()
    };

    return { 
      success: true, 
      message: 'Post salvo com sucesso',
      data: mockPosts[postIndex]
    };
  },

  // Remover post dos salvos
  async unsavePost(postId: string, userId: string): Promise<InteractionResponse> {
    await delay(200);

    const postIndex = mockPosts.findIndex(p => p.id === postId);
    if (postIndex === -1) {
      return { success: false, message: 'Post não encontrado' };
    }

    const post = mockPosts[postIndex];
    if (!post.savedBy.includes(userId)) {
      return { success: false, message: 'Post não foi salvo' };
    }

    // Atualiza o post
    mockPosts[postIndex] = {
      ...post,
      saves: Math.max(0, post.saves - 1),
      savedBy: post.savedBy.filter(id => id !== userId),
      updatedAt: new Date()
    };

    return { 
      success: true, 
      message: 'Post removido dos salvos',
      data: mockPosts[postIndex]
    };
  },

  // Adicionar comentário
  async addComment(request: AddCommentRequest): Promise<InteractionResponse> {
    await delay(300);

    const { postId, authorId, content } = request;

    const postIndex = mockPosts.findIndex(p => p.id === postId);
    if (postIndex === -1) {
      return { success: false, message: 'Post não encontrado' };
    }

    const author = findUserById(authorId);
    if (!author) {
      return { success: false, message: 'Usuário não encontrado' };
    }

    if (!content.trim()) {
      return { success: false, message: 'Comentário não pode estar vazio' };
    }

    // Cria o novo comentário
    const newComment: Comment = {
      id: generateId(),
      postId,
      authorId,
      author,
      content: content.trim(),
      createdAt: new Date()
    };

    // Atualiza o post
    const post = mockPosts[postIndex];
    mockPosts[postIndex] = {
      ...post,
      comments: [...post.comments, newComment],
      updatedAt: new Date()
    };

    return { 
      success: true, 
      message: 'Comentário adicionado com sucesso',
      data: { comment: newComment, post: mockPosts[postIndex] }
    };
  },

  // Obter comentários de um post
  async getPostComments(postId: string): Promise<InteractionResponse> {
    await delay(200);

    const post = mockPosts.find(p => p.id === postId);
    if (!post) {
      return { success: false, message: 'Post não encontrado' };
    }

    return { 
      success: true, 
      data: post.comments.sort((a, b) => 
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      )
    };
  },

  // Obter estatísticas de um post
  async getPostStats(postId: string): Promise<InteractionResponse> {
    await delay(100);

    const post = mockPosts.find(p => p.id === postId);
    if (!post) {
      return { success: false, message: 'Post não encontrado' };
    }

    return { 
      success: true, 
      data: {
        likes: post.likes,
        saves: post.saves,
        comments: post.comments.length,
        likedBy: post.likedBy,
        savedBy: post.savedBy
      }
    };
  },

  // Compartilhar post (simulação)
  async sharePost(postId: string, userId: string): Promise<InteractionResponse> {
    await delay(300);

    const post = mockPosts.find(p => p.id === postId);
    if (!post) {
      return { success: false, message: 'Post não encontrado' };
    }

    // Simula compartilhamento (em uma implementação real, isso criaria um novo post ou enviaria para redes sociais)
    const shareUrl = `${window.location.origin}/Roteirum/post/${postId}`;
    
    // Copia para clipboard se disponível
    if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(shareUrl);
        return { 
          success: true, 
          message: 'Link copiado para a área de transferência!',
          data: { shareUrl }
        };
      } catch (error) {
        return { 
          success: true, 
          message: 'Post compartilhado com sucesso!',
          data: { shareUrl }
        };
      }
    }

    return { 
      success: true, 
      message: 'Post compartilhado com sucesso!',
      data: { shareUrl }
    };
  },

  // Obter posts curtidos por um usuário
  async getUserLikedPosts(userId: string): Promise<InteractionResponse> {
    await delay(300);

    const likedPosts = mockPosts.filter(post => post.likedBy.includes(userId));
    
    return { 
      success: true, 
      data: likedPosts.sort((a, b) => 
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      )
    };
  },

  // Obter posts salvos por um usuário
  async getUserSavedPosts(userId: string): Promise<InteractionResponse> {
    await delay(300);

    const savedPosts = mockPosts.filter(post => post.savedBy.includes(userId));
    
    return { 
      success: true, 
      data: savedPosts.sort((a, b) => 
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      )
    };
  },

  // Obter posts criados por um usuário
  async getUserPosts(userId: string): Promise<InteractionResponse> {
    await delay(300);

    const userPosts = mockPosts.filter(post => post.authorId === userId);
    
    return { 
      success: true, 
      data: userPosts.sort((a, b) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
    };
  }
};