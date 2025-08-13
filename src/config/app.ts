export const APP_CONFIG = {
  name: 'Roteirum',
  version: '1.0.0',
  description: 'Crie Filmes com IA, Ganhe com Criatividade',
  
  // URLs
  baseUrl: process.env.NODE_ENV === 'production' 
    ? 'https://lucasrubo.github.io/Roteirum' 
    : 'http://localhost:5173',
  
  // Configurações de API (para futuro)
  api: {
    timeout: 10000,
    retries: 3,
    baseURL: process.env.VITE_API_URL || '/api'
  },
  
  // Configurações de UI
  ui: {
    postsPerPage: 10,
    maxSearchSuggestions: 8,
    toastDuration: 5000,
    skeletonCount: 3
  },
  
  // Configurações de ranking
  ranking: {
    topLimit: 100,
    periods: ['week', 'month', 'year', 'all'] as const,
    defaultPeriod: 'month' as const,
    scoreWeights: {
      like: 1.0,
      save: 2.0,
      comment: 3.0
    }
  },
  
  // Configurações de autenticação
  auth: {
    tokenKey: 'roteirum_token',
    userKey: 'roteirum_user',
    sessionDuration: 24 * 60 * 60 * 1000, // 24 horas
    rememberMeDuration: 30 * 24 * 60 * 60 * 1000 // 30 dias
  },
  
  // Configurações de localStorage
  storage: {
    searchHistoryKey: 'roteirum_search_history',
    preferencesKey: 'roteirum_preferences',
    maxSearchHistory: 10
  },
  
  // Configurações de posts
  posts: {
    types: ['synopsis', 'poster', 'ai-image'] as const,
    maxTitleLength: 100,
    maxContentLength: 2000,
    maxTags: 10,
    allowedImageTypes: ['image/jpeg', 'image/png', 'image/webp'],
    maxImageSize: 5 * 1024 * 1024 // 5MB
  },
  
  // Configurações de notificações
  notifications: {
    enablePush: false,
    enableEmail: true,
    types: {
      like: true,
      comment: true,
      follow: true,
      mention: true
    }
  },
  
  // Features flags
  features: {
    enableComments: true,
    enableSharing: true,
    enableNotifications: true,
    enableDarkMode: true,
    enableOfflineMode: false,
    enableAnalytics: process.env.NODE_ENV === 'production'
  },
  
  // Configurações de desenvolvimento
  dev: {
    enableDebugMode: process.env.NODE_ENV === 'development',
    showPerformanceMetrics: false,
    enableMockData: true
  }
};

export type AppConfig = typeof APP_CONFIG;