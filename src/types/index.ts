// User types
export type { User, AuthState } from './User';

// Post types
export type { Post, Comment, PostType, PostInteraction } from './Post';

// Common types
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

export interface SearchFilters {
  query: string;
  type?: PostType;
  tags?: string[];
  authorId?: string;
  dateFrom?: Date;
  dateTo?: Date;
}