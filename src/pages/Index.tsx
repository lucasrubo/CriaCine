import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import LandingPage from "@/pages/LandingPage";

const Index = () => {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    // Se usuário está logado, redireciona para o feed
    if (isAuthenticated && !isLoading) {
      navigate("/feed", { replace: true });
    }
  }, [isAuthenticated, isLoading, navigate]);

  // Mostra loading enquanto verifica autenticação
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-hero">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Carregando...</p>
        </div>
      </div>
    );
  }

  // Se está logado, não mostra a landing page (será redirecionado)
  if (isAuthenticated) {
    return null;
  }

  return <LandingPage />;
};

export default Index;
