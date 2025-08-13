import { User } from './User';

export type PostType = 'synopsis' | 'poster' | 'ai-image';

export interface Comment {
  id: string;
  postId: string;
  authorId: string;
  author: User;
  content: string;
  createdAt: Date;
}

export interface Post {
  id: string;
  authorId: string;
  author: User;
  type: PostType;
  title: string;
  content: string;
  imageUrl?: string;
  tags: string[];
  likes: number;
  likedBy: string[]; // user IDs
  saves: number;
  savedBy: string[]; // user IDs
  comments: Comment[];
  createdAt: Date;
  updatedAt: Date;
}

export interface PostInteraction {
  postId: string;
  userId: string;
  type: 'like' | 'save';
  createdAt: Date;
}