import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import SearchBar from "@/components/feed/SearchBar";
import MobileNav from "./MobileNav";
import { LogOut, Home, Bell, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  title?: string;
  subtitle?: string;
  icon?: React.ReactNode;
  showSearch?: boolean;
  showBackButton?: boolean;
  backPath?: string;
  className?: string;
}

const Header = ({
  title = "Feed",
  subtitle,
  icon = <Home className="h-6 w-6 text-primary" />,
  showSearch = true,
  showBackButton = false,
  backPath = "/Roteirum/feed",
  className = "",
}: HeaderProps) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
  };

  const handleBack = () => {
    navigate(backPath);
  };

  const handleCreatePost = () => {
    navigate("/Roteirum/create");
  };

  const handleNotifications = () => {
    navigate("/Roteirum/notifications");
  };

  return (
    <header
      className={`border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50 ${className}`}
    >
      <div className="max-w-7xl mx-auto px-4 py-3">
        {/* Top row - Title and user actions */}
        <div className="flex items-center justify-between">
          <div className="dark flex items-center space-x-3">
            {/* Mobile menu */}
            <MobileNav />

            {/* Back button for mobile */}
            {showBackButton && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleBack}
                className="lg:flex items-center space-x-2"
              >
                <span>←</span>
                <span className="hidden sm:inline">Voltar</span>
              </Button>
            )}

            {/* Title section */}
            <div className="flex items-center space-x-3">
              {icon}
              <div>
                <h1 className="text-lg lg:text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  {title}
                </h1>
                {subtitle && (
                  <p className="text-sm text-muted-foreground hidden sm:block">
                    {subtitle}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Search bar - positioned between title and actions */}
          {showSearch && (
            <div className="hidden md:block flex-1 max-w-md mx-6">
              <SearchBar placeholder="Pesquisar..." className="w-full" />
            </div>
          )}

          {/* Desktop user actions */}
          <div className="hidden lg:flex items-center space-x-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCreatePost}
              className="text-foreground flex items-center space-x-2"
            >
              <Plus className="h-4 w-4" />
              <span>Criar</span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={handleNotifications}
              className="text-foreground relative"
            >
              <Bell className="h-4 w-4" />
              {/* Notification badge */}
              <span className="absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full"></span>
            </Button>

            <div className="flex items-center space-x-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user?.avatar} alt={user?.name} />
                <AvatarFallback>
                  {user?.name?.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <span className="text-foreground text-sm font-medium hidden xl:inline">
                {user?.name}
              </span>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="text-foreground flex items-center space-x-1"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden xl:inline">Sair</span>
            </Button>
          </div>

          {/* Mobile user actions */}
          <div className="flex lg:hidden items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCreatePost}
              className="text-foreground p-2"
            >
              <Plus className="h-4 w-4" />
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={handleNotifications}
              className="text-foreground relative p-2"
            >
              <Bell className="h-4 w-4" />
              <span className="absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full"></span>
            </Button>

            <Avatar className="h-7 w-7">
              <AvatarImage src={user?.avatar} alt={user?.name} />
              <AvatarFallback className="text-xs">
                {user?.name?.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </div>
        </div>

        {/* Mobile search bar - below the main header */}
        {showSearch && (
          <div className="md:hidden mt-3">
            <SearchBar
              placeholder="Pesquisar posts, usuários, tags..."
              className="w-full"
            />
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
