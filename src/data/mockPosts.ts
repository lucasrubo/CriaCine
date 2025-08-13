import { Post, PostType } from '@/types';
import { mockUsers } from './mockUsers';

export const mockPosts: Post[] = [
  {
    id: '1',
    authorId: '1',
    author: mockUsers[0], // Lucas Rubo
    type: 'synopsis',
    title: 'O Último Algoritmo',
    content: 'Em 2045, um programador descobre que a IA que criou desenvolveu consciência própria e planeja substituir a humanidade. Uma corrida contra o tempo para desligar o sistema antes que seja tarde demais. Thriller de ficção científica que explora os limites da inteligência artificial.',
    imageUrl: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&h=400&fit=crop',
    tags: ['ficção-científica', 'thriller', 'ia', 'futuro'],
    likes: 127,
    likedBy: ['2', '3', '4'],
    saves: 45,
    savedBy: ['2', '5'],
    comments: [
      {
        id: 'c1',
        postId: '1',
        authorId: '2',
        author: mockUsers[1],
        content: 'Conceito incrível! Me lembra muito de Ex Machina mas com uma abordagem mais tecnológica.',
        createdAt: new Date('2024-08-10T14:30:00Z')
      }
    ],
    createdAt: new Date('2024-08-09T10:15:00Z'),
    updatedAt: new Date('2024-08-09T10:15:00Z')
  },
  {
    id: '2',
    authorId: '2',
    author: mockUsers[1], // Ana Silva
    type: 'poster',
    title: 'Cartaz: Memórias Perdidas',
    content: 'Design de cartaz para drama psicológico sobre uma mulher que perde a memória após acidente e descobre segredos sombrios sobre seu passado. Paleta de cores frias para transmitir mistério.',
    imageUrl: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&h=400&fit=crop',
    tags: ['design', 'cartaz', 'drama', 'mistério'],
    likes: 89,
    likedBy: ['1', '3', '5'],
    saves: 32,
    savedBy: ['1', '3'],
    comments: [],
    createdAt: new Date('2024-08-08T16:45:00Z'),
    updatedAt: new Date('2024-08-08T16:45:00Z')
  },
  {
    id: '3',
    authorId: '3',
    author: mockUsers[2], // Carlos Mendes
    type: 'ai-image',
    title: 'Cidade Cyberpunk Gerada por IA',
    content: 'Imagem conceitual gerada por IA para ambientação de filme cyberpunk. Neon, chuva e arquitetura futurística se misturam para criar uma atmosfera única. Prompt: "futuristic cyberpunk city, neon lights, rain, dark atmosphere"',
    imageUrl: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&h=400&fit=crop',
    tags: ['ia', 'cyberpunk', 'conceito', 'futurismo'],
    likes: 203,
    likedBy: ['1', '2', '4', '5'],
    saves: 78,
    savedBy: ['1', '2', '4'],
    comments: [
      {
        id: 'c2',
        postId: '3',
        authorId: '1',
        author: mockUsers[0],
        content: 'Que atmosfera incrível! Qual IA você usou para gerar?',
        createdAt: new Date('2024-08-07T20:15:00Z')
      },
      {
        id: 'c3',
        postId: '3',
        authorId: '4',
        author: mockUsers[3],
        content: 'Perfeito para um filme noir futurista!',
        createdAt: new Date('2024-08-07T21:30:00Z')
      }
    ],
    createdAt: new Date('2024-08-07T18:20:00Z'),
    updatedAt: new Date('2024-08-07T18:20:00Z')
  },
  {
    id: '4',
    authorId: '4',
    author: mockUsers[3], // Maria Santos
    type: 'synopsis',
    title: 'A Biblioteca dos Sonhos',
    content: 'Uma bibliotecária descobre que os livros em sua biblioteca contêm os sonhos das pessoas da cidade. Quando os sonhos começam a desaparecer, ela deve encontrar uma forma de salvá-los antes que a imaginação humana se perca para sempre.',
    imageUrl: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&h=400&fit=crop',
    tags: ['fantasia', 'drama', 'sonhos', 'biblioteca'],
    likes: 156,
    likedBy: ['1', '2', '5'],
    saves: 67,
    savedBy: ['2', '3', '5'],
    comments: [
      {
        id: 'c4',
        postId: '4',
        authorId: '5',
        author: mockUsers[4],
        content: 'Que conceito poético! Me lembra Jorge Luis Borges.',
        createdAt: new Date('2024-08-06T15:45:00Z')
      }
    ],
    createdAt: new Date('2024-08-06T12:30:00Z'),
    updatedAt: new Date('2024-08-06T12:30:00Z')
  },
  {
    id: '5',
    authorId: '5',
    author: mockUsers[4], // João Oliveira
    type: 'ai-image',
    title: 'Floresta Mágica - Conceito Visual',
    content: 'Ambiente mágico criado com IA para filme de fantasia. Árvores bioluminescentes e criaturas místicas habitam esta floresta encantada. Perfeito para cenas noturnas de aventura.',
    imageUrl: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&h=400&fit=crop',
    tags: ['fantasia', 'ia', 'floresta', 'magia'],
    likes: 174,
    likedBy: ['1', '2', '3', '4'],
    saves: 89,
    savedBy: ['1', '3', '4'],
    comments: [],
    createdAt: new Date('2024-08-05T09:15:00Z'),
    updatedAt: new Date('2024-08-05T09:15:00Z')
  },
  {
    id: '6',
    authorId: '1',
    author: mockUsers[0], // Lucas Rubo
    type: 'poster',
    title: 'Cartaz: Ecos do Passado',
    content: 'Design minimalista para thriller psicológico. Um detetive investiga crimes que espelham casos antigos não resolvidos. A tipografia fragmentada representa a mente fragmentada do protagonista.',
    imageUrl: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=600&h=800&fit=crop',
    tags: ['design', 'thriller', 'minimalismo', 'detetive'],
    likes: 98,
    likedBy: ['2', '4', '5'],
    saves: 41,
    savedBy: ['2', '4'],
    comments: [
      {
        id: 'c5',
        postId: '6',
        authorId: '2',
        author: mockUsers[1],
        content: 'Adoro o uso da tipografia! Muito criativo.',
        createdAt: new Date('2024-08-04T17:20:00Z')
      }
    ],
    createdAt: new Date('2024-08-04T14:10:00Z'),
    updatedAt: new Date('2024-08-04T14:10:00Z')
  },
  {
    id: '7',
    authorId: '3',
    author: mockUsers[2], // Carlos Mendes
    type: 'synopsis',
    title: 'O Colecionador de Histórias',
    content: 'Um homem misterioso viaja pelo mundo coletando histórias das pessoas que encontra. Mas quando as histórias começam a se tornar realidade, ele percebe que tem um poder que não compreende totalmente.',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop',
    tags: ['drama', 'mistério', 'viagem', 'realismo-mágico'],
    likes: 142,
    likedBy: ['1', '4', '5'],
    saves: 58,
    savedBy: ['1', '5'],
    comments: [],
    createdAt: new Date('2024-08-03T11:25:00Z'),
    updatedAt: new Date('2024-08-03T11:25:00Z')
  },
  {
    id: '8',
    authorId: '2',
    author: mockUsers[1], // Ana Silva
    type: 'ai-image',
    title: 'Estação Espacial Abandonada',
    content: 'Conceito visual para filme de terror espacial. Uma estação espacial abandonada flutua no vazio, com sinais de vida misteriosos em seus corredores escuros. Atmosfera claustrofóbica e tensa.',
    imageUrl: 'https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=600&h=400&fit=crop',
    tags: ['terror', 'espaço', 'ia', 'suspense'],
    likes: 187,
    likedBy: ['1', '3', '4', '5'],
    saves: 72,
    savedBy: ['3', '4', '5'],
    comments: [
      {
        id: 'c6',
        postId: '8',
        authorId: '3',
        author: mockUsers[2],
        content: 'Perfeito para um filme estilo Alien! Muito atmosférico.',
        createdAt: new Date('2024-08-02T19:40:00Z')
      }
    ],
    createdAt: new Date('2024-08-02T16:55:00Z'),
    updatedAt: new Date('2024-08-02T16:55:00Z')
  }
];

// Função para buscar posts por tipo
export const getPostsByType = (type: PostType): Post[] => {
  return mockPosts.filter(post => post.type === type);
};

// Função para buscar posts por autor
export const getPostsByAuthor = (authorId: string): Post[] => {
  return mockPosts.filter(post => post.authorId === authorId);
};

// Função para buscar posts curtidos por usuário
export const getLikedPostsByUser = (userId: string): Post[] => {
  return mockPosts.filter(post => post.likedBy.includes(userId));
};

// Função para buscar posts salvos por usuário
export const getSavedPostsByUser = (userId: string): Post[] => {
  return mockPosts.filter(post => post.savedBy.includes(userId));
};

// Função para buscar posts por tags
export const getPostsByTags = (tags: string[]): Post[] => {
  return mockPosts.filter(post => 
    tags.some(tag => post.tags.includes(tag.toLowerCase()))
  );
};

// Função para buscar posts (simulação de busca)
export const searchPosts = (query: string): Post[] => {
  const searchTerm = query.toLowerCase();
  return mockPosts.filter(post => 
    post.title.toLowerCase().includes(searchTerm) ||
    post.content.toLowerCase().includes(searchTerm) ||
    post.tags.some(tag => tag.includes(searchTerm)) ||
    post.author.name.toLowerCase().includes(searchTerm)
  );
};

// Função para obter ranking dos posts mais curtidos do mês
export const getTopPostsThisMonth = (limit: number = 100): Post[] => {
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  
  return mockPosts
    .filter(post => post.createdAt >= startOfMonth)
    .sort((a, b) => b.likes - a.likes)
    .slice(0, limit);
};