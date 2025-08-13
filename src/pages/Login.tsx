import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '@/components/auth/LoginForm';
import { useAuth } from '@/hooks/useAuth';

const Login = () => {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    // Se já está autenticado, redireciona para o feed
    if (isAuthenticated && !isLoading) {
      navigate('/Roteirum/feed', { replace: true });
    }
  }, [isAuthenticated, isLoading, navigate]);

  const handleLoginSuccess = () => {
    navigate('/Roteirum/feed', { replace: true });
  };

  // Mostra loading enquanto verifica autenticação
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-hero">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Verificando autenticação...</p>
        </div>
      </div>
    );
  }

  // Se já está autenticado, não mostra o formulário
  if (isAuthenticated) {
    return null;
  }

  return <LoginForm onSuccess={handleLoginSuccess} />;
};

export default Login;