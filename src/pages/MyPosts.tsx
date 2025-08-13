import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import FeedContainer from '@/components/feed/FeedContainer';
import AppLayout from '@/components/layout/AppLayout';
import Sidebar from '@/components/sidebar/Sidebar';
import { 
  Send, 
  Filter, 
  Plus,
  FileText,
  Image as ImageIcon,
  Film,
  BarChart3,
  TrendingUp
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { PostType } from '@/types';

const MyPosts = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all');

  const handleCreatePost = () => {
    navigate('/Roteirum/create');
  };

  const getFilteredType = (): PostType | undefined => {
    switch (activeTab) {
      case 'synopsis':
        return 'synopsis';
      case 'poster':
        return 'poster';
      case 'ai-image':
        return 'ai-image';
      default:
        return undefined;
    }
  };

  const postTypes = [
    {
      id: 'all',
      label: 'Todos',
      icon: Send,
      count: 0,
      description: 'Todos os seus posts'
    },
    {
      id: 'synopsis',
      label: 'Sinopses',
      icon: FileText,
      count: 0,
      description: 'Roteiros e sinopses'
    },
    {
      id: 'poster',
      label: 'Cartazes',
      icon: ImageIcon,
      count: 0,
      description: 'Designs e cartazes'
    },
    {
      id: 'ai-image',
      label: 'IA Imagens',
      icon: Film,
      count: 0,
      description: 'Imagens geradas por IA'
    }
  ];

  return (
    <AppLayout
      title="Meus Posts"
      subtitle="Seu portfólio criativo na comunidade"
      icon={<Send className="h-6 w-6 text-green-500" />}
      showSearch={true}
      showBackButton={true}
      backPath="/Roteirum/feed"
      sidebarContent={
        <div className="space-y-4">
          <Sidebar showTopRanking={false} />
          
          {/* Estatísticas dos posts */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center space-x-2">
                <BarChart3 className="h-4 w-4 text-primary" />
                <span>Suas Estatísticas</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="text-center p-2 bg-muted/30 rounded-lg">
                  <div className="text-lg font-bold text-primary">0</div>
                  <div className="text-xs text-muted-foreground">Total Posts</div>
                </div>
                <div className="text-center p-2 bg-muted/30 rounded-lg">
                  <div className="text-lg font-bold text-red-500">0</div>
                  <div className="text-xs text-muted-foreground">Curtidas</div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="text-center p-2 bg-muted/30 rounded-lg">
                  <div className="text-lg font-bold text-blue-500">0</div>
                  <div className="text-xs text-muted-foreground">Salvos</div>
                </div>
                <div className="text-center p-2 bg-muted/30 rounded-lg">
                  <div className="text-lg font-bold text-green-500">0</div>
                  <div className="text-xs text-muted-foreground">Comentários</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      }
    >
      <div className="space-y-6">
            {/* Cabeçalho da página */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center space-x-3 mb-2">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={user?.avatar} alt={user?.name} />
                        <AvatarFallback>
                          {user?.name?.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h2 className="text-xl font-semibold">Seu Portfólio Criativo</h2>
                        <p className="text-muted-foreground text-sm">
                          Todos os posts que você compartilhou com a comunidade
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 mt-3">
                      <Badge variant="secondary" className="text-xs">
                        <Send className="h-3 w-3 mr-1" />
                        Seus Posts
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        Ordenado por mais recente
                      </Badge>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="lg:hidden">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Tabs para filtrar por tipo */}
            <Card>
              <CardContent className="pt-4">
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid w-full grid-cols-4">
                    {postTypes.map((type) => {
                      const Icon = type.icon;
                      return (
                        <TabsTrigger 
                          key={type.id} 
                          value={type.id} 
                          className="text-xs flex items-center space-x-1"
                        >
                          <Icon className="h-3 w-3" />
                          <span className="hidden sm:inline">{type.label}</span>
                        </TabsTrigger>
                      );
                    })}
                  </TabsList>
                </Tabs>
              </CardContent>
            </Card>

            {/* Call to action se não há posts */}
            <Card className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border-green-200 dark:border-green-800">
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="p-3 bg-green-500/10 rounded-full w-fit mx-auto mb-3">
                    <Plus className="h-6 w-6 text-green-500" />
                  </div>
                  <h3 className="font-semibold mb-2">Comece a criar!</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Compartilhe suas ideias cinematográficas com a comunidade. 
                    Crie sinopses, designs de cartazes ou gere imagens com IA.
                  </p>
                  <Button
                    onClick={handleCreatePost}
                    className="bg-gradient-accent hover:opacity-90"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Criar Primeiro Post
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Feed de posts do usuário */}
            <FeedContainer
              userId={user?.id}
              filter="authored"
              type={getFilteredType()}
              className="space-y-4"
            />
      </div>
    </AppLayout>
  );
};

export default MyPosts;