import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import FeedContainer from "@/components/feed/FeedContainer";
import AppLayout from "@/components/layout/AppLayout";
import Sidebar from "@/components/sidebar/Sidebar";
import { Bookmark, Filter, FolderOpen } from "lucide-react";

const Saved = () => {
  const { user } = useAuth();

  return (
    <AppLayout
      title="Posts Salvos"
      subtitle="Sua biblioteca pessoal de inspirações"
      icon={<Bookmark className="h-5 w-5 text-blue-500" />}
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
                  <div className="p-2 bg-blue-500/10 rounded-lg">
                    <Bookmark className="h-5 w-5 text-blue-500" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold">
                      Sua Biblioteca Pessoal
                    </h2>
                    <p className="text-muted-foreground text-sm">
                      Posts salvos para consultar mais tarde
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2 mt-3">
                  <Badge variant="secondary" className="text-xs">
                    <Bookmark className="h-3 w-3 mr-1" />
                    Salvos
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

        {/* Dicas para posts salvos */}
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border-blue-200 dark:border-blue-800">
          <CardContent className="pt-4">
            <div className="flex items-start space-x-3">
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <FolderOpen className="h-4 w-4 text-blue-500" />
              </div>
              <div>
                <h3 className="font-medium text-sm mb-1">
                  Organize sua inspiração
                </h3>
                <p className="text-xs text-muted-foreground">
                  Use os posts salvos como referência para seus próprios
                  projetos. Você pode acessá-los offline e organizá-los por
                  categorias.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Feed de posts salvos */}
        <FeedContainer userId={user?.id} filter="saved" className="space-y-4" />
      </div>
    </AppLayout>
  );
};

export default Saved;
