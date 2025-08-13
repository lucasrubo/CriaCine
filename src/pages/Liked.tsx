import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import FeedContainer from '@/components/feed/FeedContainer';
import AppLayout from '@/components/layout/AppLayout';
import Sidebar from '@/components/sidebar/Sidebar';
import { Heart, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Liked = () => {
  const { user } = useAuth();

  return (
    <AppLayout
      title="Posts Curtidos"
      subtitle="Todos os posts que receberam sua curtida"
      icon={<Heart className="h-5 w-5 text-red-500" />}
      showSearch={true}
      showBackButton={true}
      backPath="/Roteirum/feed"
      sidebarContent={<Sidebar showTopRanking={false} />}
    >
      <div className="space-y-6">
        {/* Cabeçalho da página */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center space-x-3 mb-2">
                  <div className="p-2 bg-red-500/10 rounded-lg">
                    <Heart className="h-5 w-5 text-red-500" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold">Posts que Você Curtiu</h2>
                    <p className="text-muted-foreground text-sm">
                      Todos os posts que receberam sua curtida
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2 mt-3">
                  <Badge variant="secondary" className="text-xs">
                    <Heart className="h-3 w-3 mr-1" />
                    Curtidos
                  </Badge>
                  <Badge variant="outline" className="text-xs">
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

        {/* Feed de posts curtidos */}
        <FeedContainer
          userId={user?.id}
          filter="liked"
          className="space-y-4"
        />
      </div>
    </AppLayout>
  );
};

export default Liked;