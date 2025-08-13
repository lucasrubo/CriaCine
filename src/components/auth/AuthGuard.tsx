import { ReactNode, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Loader2 } from 'lucide-react';

interface AuthGuardProps {
  children: ReactNode;
  requireAuth?: boolean;
  redirectTo?: string;
}

const AuthGuard = ({ 
  children, 
  requireAuth = true, 
  redirectTo 
}: AuthGuardProps) => {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (isLoading) return; // Aguarda verificação de auth

    if (requireAuth && !isAuthenticated) {
      // Usuário não autenticado tentando acessar rota protegida
      navigate('/Roteirum/login', { 
        replace: true,
        state: { from: location.pathname } // Salva a rota original
      });
    } else if (!requireAuth && isAuthenticated && redirectTo) {
      // Usuário autenticado tentando acessar rota pública (ex: login)
      navigate(redirectTo, { replace: true });
    }
  }, [isAuthenticated, isLoading, requireAuth, navigate, location.pathname, redirectTo]);

  // Mostra loading enquanto verifica autenticação
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Carregando...</p>
        </div>
      </div>
    );
  }

  // Para rotas que requerem auth
  if (requireAuth && !isAuthenticated) {
    return null; // Não renderiza nada, pois será redirecionado
  }

  // Para rotas que não requerem auth (ex: login) mas usuário está logado
  if (!requireAuth && isAuthenticated && redirectTo) {
    return null; // Não renderiza nada, pois será redirecionado
  }

  return <>{children}</>;
};

export default AuthGuard;