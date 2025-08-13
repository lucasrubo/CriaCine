import { useNavigate } from 'react-router-dom';
import { useRanking } from '@/hooks/useRanking';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import { 
  Trophy, 
  TrendingUp, 
  Heart, 
  Calendar,
  Crown,
  Medal,
  Award,
  ArrowUp,
  ArrowDown,
  Minus,
  Sparkles
} from 'lucide-react';
import { Post } from '@/types';
import { RankingEntry } from '@/data/rankingService';

interface TopRankingProps {
  className?: string;
  limit?: number;
  showFullRanking?: boolean;
}

const TopRanking = ({ 
  className = '', 
  limit = 10, 
  showFullRanking = false 
}: TopRankingProps) => {
  const navigate = useNavigate();
  const { 
    ranking, 
    loading, 
    period, 
    totalPosts, 
    lastUpdated, 
    changePeriod, 
    refreshRanking 
  } = useRanking({ 
    period: 'month', 
    limit: showFullRanking ? 100 : limit 
  });

  const getRankIcon = (position: number) => {
    switch (position) {
      case 1:
        return <Crown className="h-4 w-4 text-yellow-500" />;
      case 2:
        return <Medal className="h-4 w-4 text-gray-400" />;
      case 3:
        return <Award className="h-4 w-4 text-orange-500" />;
      default:
        return (
          <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center">
            <span className="text-xs font-semibold text-muted-foreground">
              {position}
            </span>
          </div>
        );
    }
  };

  const getRankBadgeColor = (position: number) => {
    if (position <= 3) return 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-white';
    if (position <= 10) return 'bg-gradient-to-r from-blue-400 to-blue-600 text-white';
    return 'bg-muted text-muted-foreground';
  };

  const handlePostClick = (post: Post) => {
    navigate(`/Roteirum/post/${post.id}`);
  };

  const handleViewFullRanking = () => {
    navigate('/Roteirum/ranking');
  };

  const handleAuthorClick = (authorId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/Roteirum/profile/${authorId}`);
  };

  const getChangeIcon = (change: number) => {
    if (change > 0) return <ArrowUp className="h-3 w-3 text-green-500" />;
    if (change < 0) return <ArrowDown className="h-3 w-3 text-red-500" />;
    return <Minus className="h-3 w-3 text-muted-foreground" />;
  };

  const formatLastUpdated = (date: Date | null) => {
    if (!date) return '';
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    
    if (minutes < 1) return 'Agora mesmo';
    if (minutes < 60) return `${minutes}min atrás`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h atrás`;
    return 'Ontem';
  };

  if (showFullRanking) {
    return (
      <div className={`space-y-4 ${className}`}>
        {/* Header com filtros */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center space-x-2">
                <Trophy className="h-5 w-5 text-yellow-500" />
                <span>Top {limit} - {period.label}</span>
              </CardTitle>
              <Button
                variant="outline"
                size="sm"
                onClick={refreshRanking}
                disabled={loading}
              >
                <TrendingUp className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2 mb-3">
              {(['week', 'month', 'year', 'all'] as const).map((periodId) => (
                <Button
                  key={periodId}
                  variant={period.id === periodId ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => changePeriod(periodId)}
                  className="text-xs"
                  disabled={loading}
                >
                  {periodId === 'week' ? 'Semana' : 
                   periodId === 'month' ? 'Mês' : 
                   periodId === 'year' ? 'Ano' : 'Todos'}
                </Button>
              ))}
            </div>
            
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>{totalPosts} posts no ranking</span>
              <span>Atualizado {formatLastUpdated(lastUpdated)}</span>
            </div>
          </CardContent>
        </Card>

        {/* Lista completa */}
        <div className="space-y-2">
          {loading ? (
            Array.from({ length: 10 }).map((_, i) => (
              <Card key={i}>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <Skeleton className="w-8 h-8 rounded-full" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-3 w-1/2" />
                    </div>
                    <Skeleton className="w-12 h-6" />
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            ranking.map((entry) => (
              <Card
                key={entry.post.id}
                className="cursor-pointer hover:bg-muted/30 transition-colors"
                onClick={() => handlePostClick(entry.post)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-2">
                      {getRankIcon(entry.position)}
                      <Badge className={`text-xs ${getRankBadgeColor(entry.position)}`}>
                        #{entry.position}
                      </Badge>
                      {entry.isNew && (
                        <Badge variant="secondary" className="text-xs">
                          <Sparkles className="h-2 w-2 mr-1" />
                          Novo
                        </Badge>
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm truncate mb-1">
                        {entry.post.title}
                      </h4>
                      <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                        <button
                          onClick={(e) => handleAuthorClick(entry.post.authorId, e)}
                          className="hover:text-primary transition-colors"
                        >
                          {entry.post.author.name}
                        </button>
                        <span>•</span>
                        <div className="flex items-center space-x-1">
                          <Heart className="h-3 w-3" />
                          <span>{entry.post.likes}</span>
                        </div>
                        <span>•</span>
                        <div className="flex items-center space-x-1">
                          <span>Score: {entry.score}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-1">
                      {getChangeIcon(entry.change)}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    );
  }

  // Versão compacta para sidebar
  return (
    <Card className={className}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm flex items-center space-x-2">
            <Trophy className="h-4 w-4 text-yellow-500" />
            <span>Top Ranking</span>
          </CardTitle>
          <Badge variant="outline" className="text-xs">
            <Calendar className="h-3 w-3 mr-1" />
            Este Mês
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {loading ? (
          Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center space-x-3">
              <Skeleton className="w-6 h-6 rounded-full" />
              <div className="flex-1 space-y-1">
                <Skeleton className="h-3 w-3/4" />
                <Skeleton className="h-2 w-1/2" />
              </div>
            </div>
          ))
        ) : (
          <>
            {ranking.slice(0, 5).map((entry) => (
              <div
                key={entry.post.id}
                className="flex items-center space-x-3 p-2 rounded-lg hover:bg-muted/30 cursor-pointer transition-colors group"
                onClick={() => handlePostClick(entry.post)}
              >
                <div className="flex items-center space-x-2">
                  {getRankIcon(entry.position)}
                  {entry.isNew && (
                    <Badge variant="secondary" className="text-xs px-1">
                      <Sparkles className="h-2 w-2" />
                    </Badge>
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate group-hover:text-primary transition-colors">
                    {entry.post.title}
                  </p>
                  <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                    <span>{entry.post.author.name}</span>
                    <span>•</span>
                    <div className="flex items-center space-x-1">
                      <Heart className="h-3 w-3" />
                      <span>{entry.post.likes}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-1">
                  {getChangeIcon(entry.change)}
                </div>
              </div>
            ))}

            {ranking.length > 5 && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleViewFullRanking}
                className="w-full mt-3"
              >
                <Trophy className="h-3 w-3 mr-2" />
                Ver Top 100 Completo
              </Button>
            )}

            {ranking.length === 0 && (
              <div className="text-center py-4">
                <Trophy className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">
                  Nenhum post no ranking para {period.label.toLowerCase()}
                </p>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default TopRanking;