import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Send, Loader2 } from 'lucide-react';
import { Post, Comment, User } from '@/types';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface PostInteractionsProps {
  post: Post;
  currentUser?: User;
  onAddComment?: (postId: string, content: string) => Promise<void>;
  onLikeComment?: (commentId: string) => Promise<void>;
}

const PostInteractions = ({
  post,
  currentUser,
  onAddComment,
  onLikeComment
}: PostInteractionsProps) => {
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAllComments, setShowAllComments] = useState(false);

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newComment.trim() || !currentUser || isSubmitting) return;

    setIsSubmitting(true);
    try {
      await onAddComment?.(post.id, newComment.trim());
      setNewComment('');
    } catch (error) {
      console.error('Erro ao adicionar comentário:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (date: Date) => {
    return formatDistanceToNow(date, { 
      addSuffix: true, 
      locale: ptBR 
    });
  };

  const commentsToShow = showAllComments 
    ? post.comments 
    : post.comments.slice(0, 3);

  return (
    <Card className="mt-4">
      <CardContent className="pt-4">
        {/* Formulário de novo comentário */}
        {currentUser && (
          <form onSubmit={handleSubmitComment} className="mb-4">
            <div className="flex space-x-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
                <AvatarFallback>
                  {currentUser.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1 flex space-x-2">
                <Input
                  placeholder="Escreva um comentário..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  disabled={isSubmitting}
                  className="flex-1"
                />
                <Button
                  type="submit"
                  size="sm"
                  disabled={!newComment.trim() || isSubmitting}
                  className="px-3"
                >
                  {isSubmitting ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          </form>
        )}

        {/* Lista de comentários */}
        {post.comments.length > 0 && (
          <div className="space-y-4">
            {commentsToShow.map((comment) => (
              <CommentItem
                key={comment.id}
                comment={comment}
                onLike={() => onLikeComment?.(comment.id)}
              />
            ))}

            {/* Botão para mostrar mais comentários */}
            {post.comments.length > 3 && !showAllComments && (
              <Button
                variant="link"
                size="sm"
                onClick={() => setShowAllComments(true)}
                className="text-muted-foreground p-0 h-auto"
              >
                Ver mais {post.comments.length - 3} comentários
              </Button>
            )}

            {/* Botão para mostrar menos comentários */}
            {showAllComments && post.comments.length > 3 && (
              <Button
                variant="link"
                size="sm"
                onClick={() => setShowAllComments(false)}
                className="text-muted-foreground p-0 h-auto"
              >
                Mostrar menos comentários
              </Button>
            )}
          </div>
        )}

        {/* Estado vazio */}
        {post.comments.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <p className="text-sm">Seja o primeiro a comentar!</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

// Componente para item individual de comentário
interface CommentItemProps {
  comment: Comment;
  onLike?: () => void;
}

const CommentItem = ({ comment, onLike }: CommentItemProps) => {
  const [isLiking, setIsLiking] = useState(false);

  const handleLike = async () => {
    if (isLiking) return;
    
    setIsLiking(true);
    try {
      await onLike?.();
    } finally {
      setIsLiking(false);
    }
  };

  const formatDate = (date: Date) => {
    return formatDistanceToNow(date, { 
      addSuffix: true, 
      locale: ptBR 
    });
  };

  return (
    <div className="flex space-x-3">
      <Avatar className="h-8 w-8">
        <AvatarImage src={comment.author.avatar} alt={comment.author.name} />
        <AvatarFallback>
          {comment.author.name.charAt(0).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      
      <div className="flex-1 min-w-0">
        <div className="bg-muted rounded-lg px-3 py-2">
          <div className="flex items-center justify-between mb-1">
            <h4 className="text-sm font-medium">
              {comment.author.name}
            </h4>
            <span className="text-xs text-muted-foreground">
              {formatDate(comment.createdAt)}
            </span>
          </div>
          <p className="text-sm leading-relaxed">
            {comment.content}
          </p>
        </div>
        
        {/* Ações do comentário */}
        <div className="flex items-center space-x-4 mt-2">
          <Button
            variant="link"
            size="sm"
            onClick={handleLike}
            disabled={isLiking}
            className="text-xs text-muted-foreground p-0 h-auto hover:text-primary"
          >
            Curtir
          </Button>
          <Button
            variant="link"
            size="sm"
            className="text-xs text-muted-foreground p-0 h-auto hover:text-primary"
          >
            Responder
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PostInteractions;