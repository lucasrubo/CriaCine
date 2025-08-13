import { useState, useEffect, useCallback } from 'react';
import { rankingService, RankingEntry, RankingPeriod, RANKING_PERIODS } from '@/data/rankingService';

interface UseRankingOptions {
  period?: RankingPeriod['id'];
  limit?: number;
  autoLoad?: boolean;
}

interface UseRankingReturn {
  ranking: RankingEntry[];
  loading: boolean;
  error: string | null;
  period: RankingPeriod;
  totalPosts: number;
  lastUpdated: Date | null;
  loadRanking: () => Promise<void>;
  changePeriod: (newPeriod: RankingPeriod['id']) => Promise<void>;
  refreshRanking: () => Promise<void>;
}

export const useRanking = (options: UseRankingOptions = {}): UseRankingReturn => {
  const {
    period: initialPeriod = 'month',
    limit = 100,
    autoLoad = true
  } = options;

  const [ranking, setRanking] = useState<RankingEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [period, setPeriod] = useState<RankingPeriod>(
    RANKING_PERIODS.find(p => p.id === initialPeriod) || RANKING_PERIODS[1]
  );
  const [totalPosts, setTotalPosts] = useState(0);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const loadRanking = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await rankingService.getRanking(period.id, limit);
      
      if (response.success && response.data) {
        setRanking(response.data);
        setTotalPosts(response.totalPosts);
        setLastUpdated(response.lastUpdated);
        setPeriod(response.period);
      } else {
        setError(response.message || 'Erro ao carregar ranking');
        setRanking([]);
        setTotalPosts(0);
      }
    } catch (err) {
      setError('Erro inesperado ao carregar ranking');
      setRanking([]);
      setTotalPosts(0);
    } finally {
      setLoading(false);
    }
  }, [period.id, limit]);

  const changePeriod = useCallback(async (newPeriod: RankingPeriod['id']) => {
    const newPeriodObj = RANKING_PERIODS.find(p => p.id === newPeriod);
    if (newPeriodObj) {
      setPeriod(newPeriodObj);
      // O useEffect irá recarregar automaticamente
    }
  }, []);

  const refreshRanking = useCallback(async () => {
    await loadRanking();
  }, [loadRanking]);

  // Carrega ranking quando período muda
  useEffect(() => {
    if (autoLoad) {
      loadRanking();
    }
  }, [loadRanking, autoLoad]);

  return {
    ranking,
    loading,
    error,
    period,
    totalPosts,
    lastUpdated,
    loadRanking,
    changePeriod,
    refreshRanking
  };
};

// Hook para estatísticas do ranking
interface UseRankingStatsReturn {
  stats: any;
  loading: boolean;
  error: string | null;
  loadStats: () => Promise<void>;
}

export const useRankingStats = (period: RankingPeriod['id'] = 'month'): UseRankingStatsReturn => {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadStats = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await rankingService.getRankingStats(period);
      
      if (response.success) {
        setStats(response.data);
      } else {
        setError(response.message || 'Erro ao carregar estatísticas');
        setStats(null);
      }
    } catch (err) {
      setError('Erro inesperado ao carregar estatísticas');
      setStats(null);
    } finally {
      setLoading(false);
    }
  }, [period]);

  useEffect(() => {
    loadStats();
  }, [loadStats]);

  return {
    stats,
    loading,
    error,
    loadStats
  };
};

// Hook para posts em trending
interface UseTrendingReturn {
  trending: any[];
  loading: boolean;
  error: string | null;
  loadTrending: () => Promise<void>;
}

export const useTrending = (limit: number = 10): UseTrendingReturn => {
  const [trending, setTrending] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadTrending = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await rankingService.getTrendingPosts(limit);
      
      if (response.success) {
        setTrending(response.data || []);
      } else {
        setError('Erro ao carregar posts em trending');
        setTrending([]);
      }
    } catch (err) {
      setError('Erro inesperado ao carregar trending');
      setTrending([]);
    } finally {
      setLoading(false);
    }
  }, [limit]);

  useEffect(() => {
    loadTrending();
  }, [loadTrending]);

  return {
    trending,
    loading,
    error,
    loadTrending
  };
};

// Hook para posição de um post específico
export const usePostPosition = (postId: string, period: RankingPeriod['id'] = 'month') => {
  const [position, setPosition] = useState<number | null>(null);
  const [totalPosts, setTotalPosts] = useState(0);
  const [loading, setLoading] = useState(false);

  const loadPosition = useCallback(async () => {
    if (!postId) return;

    setLoading(true);
    try {
      const result = await rankingService.getPostPosition(postId, period);
      setPosition(result.position);
      setTotalPosts(result.totalPosts);
    } catch (err) {
      setPosition(null);
      setTotalPosts(0);
    } finally {
      setLoading(false);
    }
  }, [postId, period]);

  useEffect(() => {
    loadPosition();
  }, [loadPosition]);

  return {
    position,
    totalPosts,
    loading,
    refreshPosition: loadPosition
  };
};