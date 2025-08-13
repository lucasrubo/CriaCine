import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Heart, 
  Bookmark, 
  Send, 
  Plus, 
  Trophy,
  TrendingUp,
  Users,
  Settings,
  ChevronRight,
  Sparkles
} from 'lucide-react';

interface SidebarProps {
  className?: string;
  showTopRanking?: boolean;
}

const Sidebar = ({ className = '', showTopRanking = true }: SidebarProps) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isCreating, setIsCreating] = useState(false);

  const navigationItems = [
    {
      id: 'liked',
      label: 'Curtidos',
      icon: Heart,
      path: '/Roteirum/liked',
      description: 'Posts que você curtiu',
      count: 0 // Será atualizado dinamicamente
    },
    {
      id: 'saved',
      label: 'Salvos',
      icon: Bookmark,
      path: '/Roteirum/saved',
      description: 'Posts salvos para depois',
      count: 0
    },
    {
      id: 'posts',
      label: 'Seus Envios',
      icon: Send,
      path: '/Roteirum/my-posts',
      description: 'Posts que você criou',
      count: 0
    }
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const handleCreatePost = () => {
    setIsCreating(true);
    // Simula criação de post
    setTimeout(() => {
      setIsCreating(false);
      // Por enquanto, apenas mostra um placeholder
      navigate('/Roteirum/create');
    }, 1000);
  };

  const isActivePath = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Ações Rápidas */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center space-x-2">
            <Sparkles className="h-4 w-4 text-primary" />
            <span>Ações Rápidas</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = isActivePath(item.path);
            
            return (
              <Button
                key={item.id}
                variant={isActive ? 'secondary' : 'ghost'}
                size="sm"
                onClick={() => handleNavigation(item.path)}
                className="w-full justify-start group hover:bg-muted/50 transition-colors"
              >
                <Icon className={`h-4 w-4 mr-3 ${isActive ? 'text-primary' : 'text-muted-foreground'}`} />
                <div className="flex-1 text-left">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">{item.label}</span>
                    {item.count > 0 && (
                      <Badge variant="secondary" className="text-xs ml-2">
                        {item.count}
                      </Badge>
                    )}
                  </div>
                </div>
                <ChevronRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Button>
            );
          })}
          
          <Separator className="my-3" />
          
          {/* Botão Criar Cartaz */}
          <Button
            onClick={handleCreatePost}
            disabled={isCreating}
            className="w-full bg-gradient-accent hover:opacity-90 text-white font-medium"
          >
            {isCreating ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Criando...
              </>
            ) : (
              <>
                <Plus className="h-4 w-4 mr-2" />
                Criar Cartaz
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Estatísticas do Usuário */}
      {user && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center space-x-2">
              <TrendingUp className="h-4 w-4 text-primary" />
              <span>Suas Estatísticas</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div className="text-center p-2 bg-muted/30 rounded-lg">
                <div className="text-lg font-bold text-primary">0</div>
                <div className="text-xs text-muted-foreground">Posts</div>
              </div>
              <div className="text-center p-2 bg-muted/30 rounded-lg">
                <div className="text-lg font-bold text-primary">0</div>
                <div className="text-xs text-muted-foreground">Curtidas</div>
              </div>
            </div>
            
            <div className="text-center p-2 bg-muted/30 rounded-lg">
              <div className="text-lg font-bold text-primary">0</div>
              <div className="text-xs text-muted-foreground">Seguidores</div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Top Ranking */}
      {showTopRanking && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Trophy className="h-4 w-4 text-yellow-500" />
                <span>Top Ranking</span>
              </div>
              <Badge variant="outline" className="text-xs">
                Este Mês
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {/* Top 3 Preview */}
            {[1, 2, 3].map((position) => (
              <div
                key={position}
                className="flex items-center space-x-3 p-2 rounded-lg hover:bg-muted/30 cursor-pointer transition-colors"
                onClick={() => navigate('/Roteirum/ranking')}
              >
                <div className={`
                  w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold
                  ${position === 1 ? 'bg-yellow-500 text-white' : 
                    position === 2 ? 'bg-gray-400 text-white' : 
                    'bg-orange-500 text-white'}
                `}>
                  {position}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">
                    Post de Exemplo #{position}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {150 - (position * 20)} curtidas
                  </p>
                </div>
              </div>
            ))}
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/Roteirum/ranking')}
              className="w-full mt-3"
            >
              Ver Top 100 Completo
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Comunidade */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center space-x-2">
            <Users className="h-4 w-4 text-primary" />
            <span>Comunidade</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="text-center p-3 bg-muted/30 rounded-lg">
            <div className="text-2xl font-bold text-primary mb-1">1.2k</div>
            <div className="text-xs text-muted-foreground">Criadores Ativos</div>
          </div>
          
          <div className="grid grid-cols-2 gap-2 text-center">
            <div className="p-2 bg-muted/20 rounded">
              <div className="text-sm font-semibold">847</div>
              <div className="text-xs text-muted-foreground">Posts Hoje</div>
            </div>
            <div className="p-2 bg-muted/20 rounded">
              <div className="text-sm font-semibold">2.1k</div>
              <div className="text-xs text-muted-foreground">Curtidas</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Configurações */}
      <Card>
        <CardContent className="pt-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/Roteirum/settings')}
            className="w-full justify-start text-muted-foreground hover:text-foreground"
          >
            <Settings className="h-4 w-4 mr-3" />
            Configurações
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Sidebar;