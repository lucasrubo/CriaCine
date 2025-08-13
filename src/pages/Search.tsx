import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import FeedContainer from '@/components/feed/FeedContainer';
import SearchBar from '@/components/feed/SearchBar';
import { LogOut, Home, ArrowLeft, Filter } from 'lucide-react';
import { PostType } from '@/types';

const Search = () => {
  const { user, logout } = useAuth();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const query = searchParams.get('q') || '';
  const tag = searchParams.get('tag') || '';
  const [activeTab, setActiveTab] = useState('all');

  const searchTerm = query || tag;

  useEffect(() => {
    // Se não há termo de busca, redireciona para o feed
    if (!searchTerm) {
      navigate('/Roteirum/feed', { replace: true });
    }
  }, [searchTerm, navigate]);

  const handleLogout = async () => {
    await logout();
  };

  const handleSearch = (newQuery: string) => {
    if (newQuery.trim()) {
      navigate(`/Roteirum/search?q=${encodeURIComponent(newQuery)}`);
    }
  };

  const handleBackToFeed = () => {
    navigate('/Roteirum/feed');
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

  const getSearchTitle = () => {
    if (tag) {
      return `Posts com a tag #${tag}`;
    }
    return `Resultados para "${query}"`;
  };

  const getSearchDescription = () => {
    if (tag) {
      return `Explore todos os posts marcados com #${tag}`;
    }
    return `Encontre posts, usuários e conteúdo relacionado a "${query}"`;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleBackToFeed}
                className="flex items-center space-x-2"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Feed</span>
              </Button>
              <div className="h-4 w-px bg-border"></div>
              <Home className="h-5 w-5 text-primary" />
              <h1 className="text-lg font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Pesquisa
              </h1>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <Avatar className="h-7 w-7">
                  <AvatarImage src={user?.avatar} alt={user?.name} />
                  <AvatarFallback className="text-xs">
                    {user?.name?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium hidden sm:inline">
                  {user?.name}
                </span>
              </div>
              
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="flex items-center space-x-1"
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">Sair</span>
              </Button>
            </div>
          </div>

          {/* Barra de pesquisa */}
          <div className="max-w-2xl">
            <SearchBar
              onSearch={handleSearch}
              placeholder="Pesquisar posts, usuários, tags..."
              className="w-full"
            />
          </div>
        </div>
      </header>

      {/* Conteúdo principal */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar esquerda */}
          <div className="hidden lg:block">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Filtros</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <h4 className="text-xs font-medium text-muted-foreground mb-2">
                    TIPO DE CONTEÚDO
                  </h4>
                  <div className="space-y-1">
                    <Button
                      variant={activeTab === 'all' ? 'secondary' : 'ghost'}
                      size="sm"
                      onClick={() => setActiveTab('all')}
                      className="w-full justify-start text-xs"
                    >
                      Todos
                    </Button>
                    <Button
                      variant={activeTab === 'synopsis' ? 'secondary' : 'ghost'}
                      size="sm"
                      onClick={() => setActiveTab('synopsis')}
                      className="w-full justify-start text-xs"
                    >
                      Sinopses
                    </Button>
                    <Button
                      variant={activeTab === 'poster' ? 'secondary' : 'ghost'}
                      size="sm"
                      onClick={() => setActiveTab('poster')}
                      className="w-full justify-start text-xs"
                    >
                      Cartazes
                    </Button>
                    <Button
                      variant={activeTab === 'ai-image' ? 'secondary' : 'ghost'}
                      size="sm"
                      onClick={() => setActiveTab('ai-image')}
                      className="w-full justify-start text-xs"
                    >
                      IA Imagens
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Resultados centrais */}
          <div className="lg:col-span-2 space-y-6">
            {/* Cabeçalho dos resultados */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-xl font-semibold mb-2">
                      {getSearchTitle()}
                    </h2>
                    <p className="text-muted-foreground text-sm">
                      {getSearchDescription()}
                    </p>
                    {tag && (
                      <Badge variant="secondary" className="mt-2">
                        #{tag}
                      </Badge>
                    )}
                  </div>
                  <Button variant="outline" size="sm" className="lg:hidden">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Tabs para mobile */}
            <div className="lg:hidden">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="all" className="text-xs">Todos</TabsTrigger>
                  <TabsTrigger value="synopsis" className="text-xs">Sinopses</TabsTrigger>
                  <TabsTrigger value="poster" className="text-xs">Cartazes</TabsTrigger>
                  <TabsTrigger value="ai-image" className="text-xs">IA</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            {/* Feed de resultados */}
            <FeedContainer
              searchQuery={searchTerm}
              type={getFilteredType()}
              className="space-y-4"
            />
          </div>

          {/* Sidebar direita */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Tags Relacionadas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {['ficção-científica', 'thriller', 'drama', 'ia', 'cyberpunk'].map((relatedTag) => (
                    <Badge
                      key={relatedTag}
                      variant="outline"
                      className="text-xs cursor-pointer hover:bg-primary/10"
                      onClick={() => navigate(`/Roteirum/search?tag=${encodeURIComponent(relatedTag)}`)}
                    >
                      #{relatedTag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Dicas de Pesquisa</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="text-xs text-muted-foreground space-y-1">
                  <p>• Use aspas para busca exata: "ficção científica"</p>
                  <p>• Use # para buscar tags: #thriller</p>
                  <p>• Combine termos: IA cyberpunk</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Search;