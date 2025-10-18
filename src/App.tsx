import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ToastProvider } from "@/components/ui/toast-provider";
import { ErrorBoundary } from "@/components/ui/error-boundary";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import AuthGuard from "@/components/auth/AuthGuard";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Feed from "./pages/Feed";
import Search from "./pages/Search";
import Liked from "./pages/Liked";
import Saved from "./pages/Saved";
import MyPosts from "./pages/MyPosts";
import Ranking from "./pages/Ranking";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      staleTime: 5 * 60 * 1000, // 5 minutos
    },
    mutations: {
      retry: 1,
    },
  },
});

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ToastProvider>
          <AuthProvider>
            <div className="dark">
              <Toaster />
              <Sonner />
              <BrowserRouter basename="/Roteirum">
                <Routes>
                  {/* Landing page pública */}
                  <Route path="/" element={<Index />} />

                  {/* Rota raiz redireciona para feed se logado, senão para landing */}
                  <Route
                    path="/feed"
                    element={
                      <AuthGuard requireAuth={true}>
                        <Feed />
                      </AuthGuard>
                    }
                  />

                  {/* Login - só acessível se não estiver logado */}
                  <Route
                    path="/login"
                    element={
                      <AuthGuard requireAuth={false} redirectTo="/feed">
                        <Login />
                      </AuthGuard>
                    }
                  />

                  {/* Pesquisa - requer autenticação */}
                  <Route
                    path="/search"
                    element={
                      <AuthGuard requireAuth={true}>
                        <Search />
                      </AuthGuard>
                    }
                  />

                  {/* Posts curtidos - requer autenticação */}
                  <Route
                    path="/liked"
                    element={
                      <AuthGuard requireAuth={true}>
                        <Liked />
                      </AuthGuard>
                    }
                  />

                  {/* Posts salvos - requer autenticação */}
                  <Route
                    path="/saved"
                    element={
                      <AuthGuard requireAuth={true}>
                        <Saved />
                      </AuthGuard>
                    }
                  />

                  {/* Posts do usuário - requer autenticação */}
                  <Route
                    path="/my-posts"
                    element={
                      <AuthGuard requireAuth={true}>
                        <MyPosts />
                      </AuthGuard>
                    }
                  />

                  {/* Ranking - requer autenticação */}
                  <Route
                    path="/ranking"
                    element={
                      <AuthGuard requireAuth={true}>
                        <Ranking />
                      </AuthGuard>
                    }
                  />

                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </div>
          </AuthProvider>
        </ToastProvider>
      </TooltipProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
