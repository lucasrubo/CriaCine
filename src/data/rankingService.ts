import { Post } from '@/types';
import { mockPosts } from './mockPosts';

export interface RankingPeriod {
  id: 'week' | 'month' | 'year' | 'all';
  label: string;
  days: number | null; // null para 'all'
}

export interface RankingEntry {
  position: number;
  post: Post;
  score: number;
  change: number; // +1, -1, 0 para mudança de posição
  isNew: boolean;
}

export interface RankingResponse {
  success: boolean;
  data?: RankingEntry[];
  period: RankingPeriod;
  totalPosts: number;
  lastUpdated: Date;
  message?: string;
}

// Períodos disponíveis
export const RANKING_PERIODS: RankingPeriod[] = [
  { id: 'week', label: 'Esta Semana', days: 7 },
  { id: 'month', label: 'Este Mês', days: 30 },
  { id: 'year', label: 'Este Ano', days: 365 },
  { id: 'all', label: 'Todos os Tempos', days: null }
];

// Simula delay de rede
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Calcula score baseado em múltiplos fatores
const calculateScore = (post: Post, period: RankingPeriod): number => {
  const now = new Date();
  const postDate = new Date(post.createdAt);
  const daysSincePost = Math.floor((now.getTime() - postDate.getTime()) / (1000 * 60 * 60 * 24));
  
  // Se o período é específico e o post está fora dele, retorna 0
  if (period.days && daysSincePost > period.days) {
    return 0;
  }
  
  // Fatores do score
  const likes = post.likes;
  const saves = post.saves;
  const comments = post.comments.length;
  
  // Peso dos fatores
  const likeWeight = 1.0;
  const saveWeight = 2.0; // Salvar é mais valioso que curtir
  const commentWeight = 3.0; // Comentar é mais valioso ainda
  
  // Score base
  let score = (likes * likeWeight) + (saves * saveWeight) + (comments * commentWeight);
  
  // Bonus por recência (posts mais recentes têm pequeno bonus)
  if (daysSincePost <= 1) {
    score *= 1.2; // 20% bonus para posts de hoje
  } else if (daysSincePost <= 7) {
    score *= 1.1; // 10% bonus para posts da semana
  }
  
  // Bonus por tipo de conteúdo (IA images são mais populares)
  if (post.type === 'ai-image') {
    score *= 1.15;
  } else if (post.type === 'poster') {
    score *= 1.1;
  }
  
  return Math.round(score * 100) / 100; // Arredonda para 2 casas decimais
};

// Simula mudanças de posição (para demonstração)
const simulatePositionChange = (position: number): number => {
  // Simula mudanças aleatórias pequenas
  const random = Math.random();
  if (random < 0.3) return 1; // 30% chance de subir
  if (random < 0.6) return -1; // 30% chance de descer
  return 0; // 40% chance de manter posição
};

export const rankingService = {
  // Obtém ranking para um período específico
  async getRanking(
    period: RankingPeriod['id'] = 'month',
    limit: number = 100
  ): Promise<RankingResponse> {
    await delay(500);

    try {
      const selectedPeriod = RANKING_PERIODS.find(p => p.id === period) || RANKING_PERIODS[1];
      
      // Filtra e calcula scores
      const postsWithScores = mockPosts
        .map(post => ({
          post,
          score: calculateScore(post, selectedPeriod)
        }))
        .filter(item => item.score > 0) // Remove posts com score 0
        .sort((a, b) => b.score - a.score) // Ordena por score decrescente
        .slice(0, limit); // Limita resultados

      // Cria entradas do ranking
      const rankingEntries: RankingEntry[] = postsWithScores.map((item, index) => ({
        position: index + 1,
        post: item.post,
        score: item.score,
        change: simulatePositionChange(index + 1),
        isNew: Math.random() < 0.1 // 10% chance de ser novo
      }));

      return {
        success: true,
        data: rankingEntries,
        period: selectedPeriod,
        totalPosts: rankingEntries.length,
        lastUpdated: new Date()
      };
    } catch (error) {
      return {
        success: false,
        period: RANKING_PERIODS.find(p => p.id === period) || RANKING_PERIODS[1],
        totalPosts: 0,
        lastUpdated: new Date(),
        message: 'Erro ao carregar ranking'
      };
    }
  },

  // Obtém posição de um post específico
  async getPostPosition(
    postId: string,
    period: RankingPeriod['id'] = 'month'
  ): Promise<{ position: number | null; totalPosts: number }> {
    await delay(200);

    const ranking = await this.getRanking(period, 1000); // Busca ranking completo
    
    if (!ranking.success || !ranking.data) {
      return { position: null, totalPosts: 0 };
    }

    const entry = ranking.data.find(item => item.post.id === postId);
    
    return {
      position: entry?.position || null,
      totalPosts: ranking.totalPosts
    };
  },

  // Obtém estatísticas do ranking
  async getRankingStats(period: RankingPeriod['id'] = 'month') {
    await delay(300);

    const ranking = await this.getRanking(period, 1000);
    
    if (!ranking.success || !ranking.data) {
      return {
        success: false,
        message: 'Erro ao carregar estatísticas'
      };
    }

    const entries = ranking.data;
    const totalLikes = entries.reduce((sum, entry) => sum + entry.post.likes, 0);
    const totalSaves = entries.reduce((sum, entry) => sum + entry.post.saves, 0);
    const totalComments = entries.reduce((sum, entry) => sum + entry.post.comments.length, 0);
    
    // Análise por tipo
    const typeStats = {
      synopsis: entries.filter(e => e.post.type === 'synopsis').length,
      poster: entries.filter(e => e.post.type === 'poster').length,
      'ai-image': entries.filter(e => e.post.type === 'ai-image').length
    };

    // Top autores
    const authorCounts: { [key: string]: { name: string; count: number; totalScore: number } } = {};
    entries.forEach(entry => {
      const authorId = entry.post.authorId;
      const authorName = entry.post.author.name;
      
      if (!authorCounts[authorId]) {
        authorCounts[authorId] = { name: authorName, count: 0, totalScore: 0 };
      }
      
      authorCounts[authorId].count++;
      authorCounts[authorId].totalScore += entry.score;
    });

    const topAuthors = Object.entries(authorCounts)
      .map(([id, data]) => ({ id, ...data }))
      .sort((a, b) => b.totalScore - a.totalScore)
      .slice(0, 10);

    return {
      success: true,
      data: {
        totalPosts: entries.length,
        totalLikes,
        totalSaves,
        totalComments,
        averageScore: entries.length > 0 ? 
          Math.round((entries.reduce((sum, e) => sum + e.score, 0) / entries.length) * 100) / 100 : 0,
        typeDistribution: typeStats,
        topAuthors,
        period: ranking.period,
        lastUpdated: ranking.lastUpdated
      }
    };
  },

  // Simula reset mensal do ranking
  async resetMonthlyRanking(): Promise<{ success: boolean; message: string }> {
    await delay(1000);

    // Em uma implementação real, isso limparia dados antigos e recalcularia
    // Por enquanto, apenas simula o reset
    
    return {
      success: true,
      message: 'Ranking mensal resetado com sucesso!'
    };
  },

  // Obtém trending posts (posts com crescimento rápido)
  async getTrendingPosts(limit: number = 10) {
    await delay(400);

    // Simula posts com crescimento rápido (posts recentes com muita interação)
    const recentPosts = mockPosts
      .filter(post => {
        const daysSincePost = Math.floor(
          (Date.now() - new Date(post.createdAt).getTime()) / (1000 * 60 * 60 * 24)
        );
        return daysSincePost <= 3; // Posts dos últimos 3 dias
      })
      .map(post => ({
        post,
        trendScore: post.likes + (post.saves * 2) + (post.comments.length * 3)
      }))
      .sort((a, b) => b.trendScore - a.trendScore)
      .slice(0, limit);

    return {
      success: true,
      data: recentPosts.map((item, index) => ({
        position: index + 1,
        post: item.post,
        trendScore: item.trendScore,
        growth: Math.floor(Math.random() * 200) + 50 // Simula % de crescimento
      }))
    };
  }
};