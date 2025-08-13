import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import SearchBar from '@/components/feed/SearchBar';
import Sidebar from '@/components/sidebar/Sidebar';
import TopRanking from '@/components/sidebar/TopRanking';
import { LogOut, Home, ArrowLeft, Trophy } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Ranking = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
  };

  const handleBackToFeed = () => {
    navigate('/Roteirum/feed');
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
              <Trophy className="h-5 w-5 text-yellow-500" />
              <h1 className="text-lg font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Top Ranking
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
            <SearchBar placeholder="Pesquisar no ranking..." />
          </div>
        </div>
      </header>

      {/* Conteúdo principal */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar esquerda */}
          <div className="hidden lg:block">
            <div className="sticky top-24">
              <Sidebar showTopRanking={false} />
            </div>
          </div>

          {/* Ranking completo */}
          <div className="lg:col-span-3">
            <TopRanking 
              showFullRanking={true} 
              limit={100}
              className="w-full"
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Ranking;