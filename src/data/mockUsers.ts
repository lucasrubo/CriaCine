import { User } from '@/types';

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Lucas Rubo',
    email: 'lucas@roteirum.com',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    bio: 'Criador de roteiros e entusiasta de cinema. Especialista em ficção científica.',
    createdAt: new Date('2024-01-15'),
    isActive: true,
  },
  {
    id: '2',
    name: 'Ana Silva',
    email: 'ana@roteirum.com',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    bio: 'Diretora de arte e designer visual. Apaixonada por storytelling.',
    createdAt: new Date('2024-01-20'),
    isActive: true,
  },
  {
    id: '3',
    name: 'Carlos Mendes',
    email: 'carlos@roteirum.com',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    bio: 'Produtor cinematográfico e roteirista. Foco em dramas e thrillers.',
    createdAt: new Date('2024-02-01'),
    isActive: true,
  },
  {
    id: '4',
    name: 'Maria Santos',
    email: 'maria@roteirum.com',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    bio: 'Crítica de cinema e escritora. Especialista em análise narrativa.',
    createdAt: new Date('2024-02-10'),
    isActive: true,
  },
  {
    id: '5',
    name: 'João Oliveira',
    email: 'joao@roteirum.com',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    bio: 'Editor de vídeo e motion designer. Criador de conteúdo visual.',
    createdAt: new Date('2024-02-15'),
    isActive: true,
  }
];

// Credenciais para login (em produção seria hash)
export const mockCredentials = [
  { email: 'lucas@roteirum.com', password: '123456' },
  { email: 'ana@roteirum.com', password: '123456' },
  { email: 'carlos@roteirum.com', password: '123456' },
  { email: 'maria@roteirum.com', password: '123456' },
  { email: 'joao@roteirum.com', password: '123456' },
  // Usuário de teste genérico
  { email: 'teste@roteirum.com', password: '123456' }
];

export const findUserByEmail = (email: string): User | undefined => {
  return mockUsers.find(user => user.email === email);
};

export const findUserById = (id: string): User | undefined => {
  return mockUsers.find(user => user.id === id);
};