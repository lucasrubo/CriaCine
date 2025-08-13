import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Heart, 
  Bookmark, 
  Send, 
  Plus, 
  Edit3,
  Share2,
  MoreHorizontal,
  Zap
} from 'lucide-react';

interface UserActionsProps {
  className?: string;
  compact?: boolean;
}

const UserActions = ({ className = '', compact = false }: UserActionsProps) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isCreating, setIsCreating] = useState(false);

  const quickActions = [
    {
      id: 'create-synopsis',
      label: 'Nova Sinopse',
      icon: Edit3,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
      action: () => handleCreateContent('synopsis')
    },
    {
      id: 'create-poster',
      label: 'Novo Cartaz',
      icon: Plus,
      color: 'text-green-500',
      bgColor: 'bg-green-500/10',
      action: () => handleCreateContent('poster')
    },
    {
      id: 'ai-generate',
      label: 'Gerar com IA',
      icon: Zap,
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10',
      action: () => handleCreateContent('ai-image')
    }
  ];

  const userStats = [
    { label: 'Posts', value: 0, path: '/Roteirum/my-posts' },
    { label: 'Curtidas', value: 0, path: '/Roteirum/liked' },
    { label: 'Salvos', value: 0, path: '/Roteirum/saved' }
  ];

  const handleCreateContent = (type: string) => {
    setIsCreating(true);
    setTimeout(() => {
      setIsCreating(false);
      navigate(`/Roteirum/create?type=${type}`);
    }, 800);
  };

  const handleViewProfile = () => {
    navigate(`/Roteirum/profile/${user?.id}`);
  };

  const handleShareProfile = () => {
    const profileUrl = `${window.location.origin}/Roteirum/profile/${user?.id}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(profileUrl);
      // Toast notification seria ideal aqui
      console.log('Link do perfil copiado!');
    }
  };

  if (compact) {
    return (
      <Card className={className}>
        <CardContent className="pt-4">
          <div className="flex items-center space-x-3 mb-4">
            <Avatar className="h-10 w-10">
              <AvatarImage src={user?.avatar} alt={user?.name} />
              <AvatarFallback>
                {user?.name?.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-sm truncate">{user?.name}</h3>
              <p className="text-xs text-muted-foreground truncate">
                {user?.bio || 'Criador de conteúdo'}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 mb-4">
            {userStats.map((stat) => (
              <button
                key={stat.label}
                onClick={() => navigate(stat.path)}
                className="text-center p-2 rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="text-sm font-semibold">{stat.value}</div>
                <div className="text-xs text-muted-foreground">{stat.label}</div>
              </button>
            ))}
          </div>

          <Button
            onClick={() => handleCreateContent('poster')}
            disabled={isCreating}
            className="w-full bg-gradient-accent hover:opacity-90"
            size="sm"
          >
            {isCreating ? (
              <>
                <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white mr-2"></div>
                Criando...
              </>
            ) : (
              <>
                <Plus className="h-3 w-3 mr-2" />
                Criar
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Perfil do Usuário */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm">Seu Perfil</CardTitle>
            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
              <MoreHorizontal className="h-3 w-3" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src={user?.avatar} alt={user?.name} />
              <AvatarFallback>
                {user?.name?.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-sm truncate">{user?.name}</h3>
              <p className="text-xs text-muted-foreground truncate">
                {user?.bio || 'Criador de conteúdo cinematográfico'}
              </p>
              <Badge variant="secondary" className="text-xs mt-1">
                Membro desde {new Date(user?.createdAt || '').getFullYear()}
              </Badge>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {userStats.map((stat) => (
              <button
                key={stat.label}
                onClick={() => navigate(stat.path)}
                className="text-center p-2 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="text-lg font-bold text-primary">{stat.value}</div>
                <div className="text-xs text-muted-foreground">{stat.label}</div>
              </button>
            ))}
          </div>

          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleViewProfile}
              className="flex-1"
            >
              Ver Perfil
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleShareProfile}
              className="px-3"
            >
              <Share2 className="h-3 w-3" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Ações Rápidas de Criação */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">Criar Conteúdo</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <Button
                key={action.id}
                variant="ghost"
                onClick={action.action}
                disabled={isCreating}
                className="w-full justify-start hover:bg-muted/50 transition-colors"
              >
                <div className={`p-2 rounded-lg ${action.bgColor} mr-3`}>
                  <Icon className={`h-4 w-4 ${action.color}`} />
                </div>
                <span className="text-sm">{action.label}</span>
              </Button>
            );
          })}

          <Separator className="my-3" />

          <div className="text-center">
            <p className="text-xs text-muted-foreground mb-2">
              Precisa de inspiração?
            </p>
            <Button
              variant="link"
              size="sm"
              onClick={() => navigate('/Roteirum/inspiration')}
              className="text-xs"
            >
              Ver Tendências
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Navegação Rápida */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">Navegação</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/Roteirum/liked')}
            className="w-full justify-start"
          >
            <Heart className="h-4 w-4 mr-3 text-red-500" />
            <span className="text-sm">Posts Curtidos</span>
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/Roteirum/saved')}
            className="w-full justify-start"
          >
            <Bookmark className="h-4 w-4 mr-3 text-blue-500" />
            <span className="text-sm">Posts Salvos</span>
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/Roteirum/my-posts')}
            className="w-full justify-start"
          >
            <Send className="h-4 w-4 mr-3 text-green-500" />
            <span className="text-sm">Meus Posts</span>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserActions;