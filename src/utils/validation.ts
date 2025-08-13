import { User, Post, Comment, PostType } from '@/types';

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validateUser = (user: Partial<User>): user is User => {
  return !!(
    user.id &&
    user.name &&
    user.email &&
    validateEmail(user.email) &&
    user.createdAt &&
    typeof user.isActive === 'boolean'
  );
};

export const validatePost = (post: Partial<Post>): post is Post => {
  const validTypes: PostType[] = ['synopsis', 'poster', 'ai-image'];
  
  return !!(
    post.id &&
    post.authorId &&
    post.author &&
    post.type &&
    validTypes.includes(post.type) &&
    post.title &&
    post.content &&
    Array.isArray(post.tags) &&
    typeof post.likes === 'number' &&
    Array.isArray(post.likedBy) &&
    typeof post.saves === 'number' &&
    Array.isArray(post.savedBy) &&
    Array.isArray(post.comments) &&
    post.createdAt &&
    post.updatedAt
  );
};

export const validateComment = (comment: Partial<Comment>): comment is Comment => {
  return !!(
    comment.id &&
    comment.postId &&
    comment.authorId &&
    comment.author &&
    comment.content &&
    comment.createdAt
  );
};

export const generateId = (): string => {
  return Math.random().toString(36).substr(2, 9);
};