import { ReactNode } from 'react';
import Header from '@/components/navigation/Header';
import Sidebar from '@/components/sidebar/Sidebar';

interface AppLayoutProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  icon?: React.ReactNode;
  showSearch?: boolean;
  showBackButton?: boolean;
  backPath?: string;
  showSidebar?: boolean;
  sidebarContent?: ReactNode;
  className?: string;
}

const AppLayout = ({
  children,
  title,
  subtitle,
  icon,
  showSearch = true,
  showBackButton = false,
  backPath,
  showSidebar = true,
  sidebarContent,
  className = ''
}: AppLayoutProps) => {
  return (
    <div className={`min-h-screen bg-background ${className}`}>
      <Header
        title={title}
        subtitle={subtitle}
        icon={icon}
        showSearch={showSearch}
        showBackButton={showBackButton}
        backPath={backPath}
      />

      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar esquerda - apenas desktop */}
          {showSidebar && (
            <div className="hidden lg:block">
              <div className="sticky top-24">
                {sidebarContent || <Sidebar />}
              </div>
            </div>
          )}

          {/* Conteúdo principal */}
          <div className={showSidebar ? 'lg:col-span-3' : 'lg:col-span-4'}>
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AppLayout;