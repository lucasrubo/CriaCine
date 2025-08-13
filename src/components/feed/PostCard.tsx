import { useState } from 'react';
import { Post } from '@/types';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Heart, 
  Bookmark, 
  MessageCircle, 
  Share2, 
  Film, 
  Image as ImageIcon, 
  FileText,
  MoreHorizontal 
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface PostCardProps {
  post: Post;
  currentUserId?: string;
  onLike?: (postId: string, userId: string) => void;
  onUnlike?: (postId: string, userId: string) => void;
  onSave?: (postId: string, userId: string) => void;
  onUnsave?: (postId: string, userId: string) => void;
  onComment?: (postId: string) => void;
  onShare?: (postId: string) => void;
}

const PostCard = ({
  post,
  currentUserId,
  onLike,
  onUnlike,
  onSave,
  onUnsave,
  onComment,
  onShare
}: PostCardProps) => {
  const [isLiking, setIsLiking] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const isLiked = currentUserId ? post.likedBy.includes(currentUserId) : false;
  const isSaved = currentUserId ? post.savedBy.includes(currentUserId) : false;

  const handleLike = async () => {
    if (!currentUserId || isLiking) return;
    
    setIsLiking(true);
    try {
      if (isLiked) {
        await onUnlike?.(post.id, currentUserId);
      } else {
        await onLike?.(post.id, currentUserId);
      }
    } finally {
      setIsLiking(false);
    }
  };

  const handleSave = async () => {
    if (!currentUserId || isSaving) return;
    
    setIsSaving(true);
    try {
      if (isSaved) {
        await onUnsave?.(post.id, currentUserId);
      } else {
        await onSave?.(post.id, currentUserId);
      }
    } finally {
      setIsSaving(false);
    }
  };

  const getPostTypeIcon = () => {
    switch (post.type) {
      case 'synopsis':
        return <FileText className="h-4 w-4" />;
      case 'poster':
        return <ImageIcon className="h-4 w-4" />;
      case 'ai-image':
        return <Film className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const getPostTypeLabel = () => {
    switch (post.type) {
      case 'synopsis':
        return 'Sinopse';
      case 'poster':
        return 'Cartaz';
      case 'ai-image':
        return 'IA Imagem';
      default:
        return 'Post';
    }
  };

  const formatDate = (date: Date) => {
    return formatDistanceToNow(date, { 
      addSuffix: true, 
      locale: ptBR 
    });
  };

  return (
    <Card className="w-full bg-card/95 backdrop-blur-sm border-border/50 hover:border-primary/20 transition-colors">
      {/* Header do Post */}
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={post.author.avatar} alt={post.author.name} />
              <AvatarFallback>
                {post.author.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2">
                <h3 className="font-semibold text-sm truncate">
                  {post.author.name}
                </h3>
                <Badge variant="secondary" className="text-xs">
                  {getPostTypeIcon()}
                  <span className="ml-1">{getPostTypeLabel()}</span>
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                {formatDate(post.createdAt)}
              </p>
            </div>
          </div>
          
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      {/* Conteúdo do Post */}
      <CardContent className="pt-0">
        {/* Título */}
        <h2 className="font-bold text-lg mb-3 leading-tight">
          {post.title}
        </h2>

        {/* Imagem (se houver) */}
        {post.imageUrl && (
          <div className="mb-4 rounded-lg overflow-hidden bg-muted">
            <img
              src={post.imageUrl}
              alt={post.title}
              className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
          </div>
        )}

        {/* Conteúdo/Descrição */}
        <p className="text-muted-foreground mb-4 leading-relaxed">
          {post.content}
        </p>

        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag) => (
              <Badge 
                key={tag} 
                variant="outline" 
                className="text-xs hover:bg-primary/10 cursor-pointer"
              >
                #{tag}
              </Badge>
            ))}
          </div>
        )}

        {/* Estatísticas */}
        <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
          <div className="flex items-center space-x-4">
            <span>{post.likes} curtidas</span>
            <span>{post.saves} salvos</span>
            <span>{post.comments.length} comentários</span>
          </div>
        </div>

        {/* Botões de Ação */}
        <div className="flex items-center justify-between pt-3 border-t border-border/50">
          <div className="flex items-center space-x-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLike}
              disabled={isLiking || !currentUserId}
              className={`flex items-center space-x-2 ${
                isLiked 
                  ? 'text-red-500 hover:text-red-600' 
                  : 'hover:text-red-500'
              }`}
            >
              <Heart 
                className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} 
              />
              <span>Curtir</span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => onComment?.(post.id)}
              className="flex items-center space-x-2 hover:text-blue-500"
            >
              <MessageCircle className="h-4 w-4" />
              <span>Comentar</span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => onShare?.(post.id)}
              className="flex items-center space-x-2 hover:text-green-500"
            >
              <Share2 className="h-4 w-4" />
              <span>Compartilhar</span>
            </Button>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={handleSave}
            disabled={isSaving || !currentUserId}
            className={`flex items-center space-x-2 ${
              isSaved 
                ? 'text-yellow-500 hover:text-yellow-600' 
                : 'hover:text-yellow-500'
            }`}
          >
            <Bookmark 
              className={`h-4 w-4 ${isSaved ? 'fill-current' : ''}`} 
            />
            <span>{isSaved ? 'Salvo' : 'Salvar'}</span>
          </Button>
        </div>

        {/* Comentários (preview) */}
        {post.comments.length > 0 && (
          <div className="mt-4 pt-3 border-t border-border/30">
            <div className="space-y-3">
              {post.comments.slice(0, 2).map((comment) => (
                <div key={comment.id} className="flex space-x-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={comment.author.avatar} alt={comment.author.name} />
                    <AvatarFallback className="text-xs">
                      {comment.author.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="bg-muted rounded-lg px-3 py-2">
                      <p className="text-xs font-medium mb-1">
                        {comment.author.name}
                      </p>
                      <p className="text-sm">{comment.content}</p>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {formatDate(comment.createdAt)}
                    </p>
                  </div>
                </div>
              ))}
              
              {post.comments.length > 2 && (
                <Button
                  variant="link"
                  size="sm"
                  onClick={() => onComment?.(post.id)}
                  className="text-xs text-muted-foreground p-0 h-auto"
                >
                  Ver todos os {post.comments.length} comentários
                </Button>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PostCard;