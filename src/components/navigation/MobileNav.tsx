import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Menu,
  Home,
  Heart,
  Bookmark,
  Send,
  Trophy,
  Search,
  Plus,
  Settings,
  LogOut,
  User,
  TrendingUp,
  Sparkles,
} from "lucide-react";

interface MobileNavProps {
  className?: string;
}

const MobileNav = ({ className = "" }: MobileNavProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const navigationItems = [
    {
      id: "feed",
      label: "Feed Principal",
      icon: Home,
      path: "/Roteirum/feed",
      description: "Página inicial",
    },
    {
      id: "search",
      label: "Pesquisar",
      icon: Search,
      path: "/Roteirum/search",
      description: "Buscar posts e usuários",
    },
    {
      id: "liked",
      label: "Curtidos",
      icon: Heart,
      path: "/Roteirum/liked",
      description: "Posts que você curtiu",
      count: 0,
    },
    {
      id: "saved",
      label: "Salvos",
      icon: Bookmark,
      path: "/Roteirum/saved",
      description: "Sua biblioteca pessoal",
      count: 0,
    },
    {
      id: "my-posts",
      label: "Meus Posts",
      icon: Send,
      path: "/Roteirum/my-posts",
      description: "Posts que você criou",
      count: 0,
    },
    {
      id: "ranking",
      label: "Top Ranking",
      icon: Trophy,
      path: "/Roteirum/ranking",
      description: "Posts mais populares",
    },
  ];

  const quickActions = [
    {
      id: "create",
      label: "Criar Post",
      icon: Plus,
      path: "/Roteirum/create",
      primary: true,
    },
    {
      id: "profile",
      label: "Meu Perfil",
      icon: User,
      path: `/Roteirum/profile/${user?.id}`,
    },
    {
      id: "settings",
      label: "Configurações",
      icon: Settings,
      path: "/Roteirum/settings",
    },
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsOpen(false);
  };

  const handleLogout = async () => {
    await logout();
    setIsOpen(false);
  };

  const isActivePath = (path: string) => {
    return location.pathname === path;
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className={`text-foreground lg:hidden ${className}`}
        >
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>

      <SheetContent
        side="left"
        className="dark w-80 p-0 !bg-background !text-foreground"
      >
        <div className="flex flex-col h-full bg-background text-foreground">
          {/* Header */}
          <SheetHeader className="p-6 pb-4">
            <div className="flex items-center space-x-3">
              <Avatar className="h-12 w-12">
                <AvatarImage src={user?.avatar} alt={user?.name} />
                <AvatarFallback>
                  {user?.name?.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <SheetTitle className="text-left truncate text-foreground">
                  {user?.name}
                </SheetTitle>
                <p className="text-sm text-muted-foreground truncate">
                  {user?.bio || "Criador de conteúdo"}
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 mt-4">
              <div className="text-center p-2 bg-muted/30 rounded-lg">
                <div className="text-lg font-bold text-primary">0</div>
                <div className="text-xs text-muted-foreground">Posts</div>
              </div>
              <div className="text-center p-2 bg-muted/30 rounded-lg">
                <div className="text-lg font-bold text-red-500">0</div>
                <div className="text-xs text-muted-foreground">Curtidas</div>
              </div>
              <div className="text-center p-2 bg-muted/30 rounded-lg">
                <div className="text-lg font-bold text-blue-500">0</div>
                <div className="text-xs text-muted-foreground">Salvos</div>
              </div>
            </div>
          </SheetHeader>

          {/* Navigation */}
          <div className="flex-1 overflow-y-auto px-6">
            {/* Quick Actions */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-muted-foreground mb-3 flex items-center">
                <Sparkles className="h-4 w-4 mr-2" />
                Ações Rápidas
              </h3>
              <div className="space-y-2">
                {quickActions.map((action) => {
                  const Icon = action.icon;
                  return (
                    <Button
                      key={action.id}
                      variant={action.primary ? "default" : "ghost"}
                      onClick={() => handleNavigation(action.path)}
                      className={`w-full justify-start ${
                        action.primary
                          ? "bg-gradient-accent hover:opacity-90"
                          : ""
                      }`}
                    >
                      <Icon className="h-4 w-4 mr-3" />
                      {action.label}
                    </Button>
                  );
                })}
              </div>
            </div>

            <Separator className="mb-6" />

            {/* Main Navigation */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-muted-foreground mb-3 flex items-center">
                <TrendingUp className="h-4 w-4 mr-2" />
                Navegação
              </h3>
              <div className="space-y-1">
                {navigationItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = isActivePath(item.path);

                  return (
                    <Button
                      key={item.id}
                      variant={isActive ? "secondary" : "ghost"}
                      onClick={() => handleNavigation(item.path)}
                      className="w-full justify-start group"
                    >
                      <Icon
                        className={`h-4 w-4 mr-3 ${
                          isActive ? "text-primary" : "text-muted-foreground"
                        }`}
                      />
                      <div className="flex-1 text-left">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-foreground">{item.label}</span>
                          {item.count !== undefined && item.count > 0 && (
                            <Badge variant="secondary" className="text-xs ml-2">
                              {item.count}
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground text-left">
                          {item.description}
                        </p>
                      </div>
                    </Button>
                  );
                })}
              </div>
            </div>

            <Separator className="mb-6" />

            {/* Community Stats */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-muted-foreground mb-3">
                Comunidade
              </h3>
              <div className="space-y-3">
                <div className="text-center p-3 bg-muted/30 rounded-lg">
                  <div className="text-2xl font-bold text-primary mb-1">
                    1.2k
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Criadores Ativos
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="text-center p-2 bg-muted/20 rounded">
                    <div className="text-sm font-semibold text-foreground">847</div>
                    <div className="text-xs text-muted-foreground">
                      Posts Hoje
                    </div>
                  </div>
                  <div className="text-center p-2 bg-muted/20 rounded">
                    <div className="text-sm font-semibold text-foreground">2.1k</div>
                    <div className="text-xs text-muted-foreground">
                      Curtidas
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 pt-4 border-t border-border">
            <Button
              variant="outline"
              onClick={handleLogout}
              className="w-full justify-start text-muted-foreground hover:text-foreground"
            >
              <LogOut className="h-4 w-4 mr-3" />
              Sair da Conta
            </Button>

            <div className="mt-4 text-center">
              <p className="text-xs text-muted-foreground">
                Roteirum v1.0 • Criado com ❤️
              </p>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
