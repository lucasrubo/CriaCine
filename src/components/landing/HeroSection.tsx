import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sparkles, Film, Zap, ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-modern-cinema.jpg";
import CounterAnimation from "@/components/ui/counter-animation";

const HeroSection = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implementar integração com lista de espera
    console.log("Email cadastrado:", email);
    setEmail("");
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-hero" />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <div className="animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            CineCria
          </h1>
          <h2 className="text-2xl md:text-4xl font-semibold mb-8 text-foreground">
            Crie Filmes com IA, Ganhe com Criatividade
          </h2>
          <p className="text-xl md:text-2xl mb-12 text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            A primeira plataforma que une inteligência artificial, criatividade cinematográfica e recompensas reais. 
            Crie sinopses únicas, gere imagens incríveis e seja reconhecido por sua originalidade.
          </p>
        </div>

        {/* CTA Form */}
        <div className="animate-slide-in-left max-w-md mx-auto">
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 mb-8">
            <Input
              type="email"
              placeholder="Seu melhor e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 h-12 text-lg bg-card/90 backdrop-blur-sm border-primary/30 focus:border-primary"
              required
            />
            <Button 
              type="submit" 
              size="lg"
              className="h-12 px-8 bg-gradient-accent text-white font-semibold animate-glow-pulse hover:scale-105 transition-transform"
            >
              Entrar na Lista <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </form>
          
          <p className="text-sm text-muted-foreground mb-8">
            🎬 Seja um dos primeiros a explorar o futuro da criação cinematográfica
          </p>

          {/* Stats Preview */}
          <div className="grid grid-cols-3 gap-6 animate-slide-in-right">
            <div className="text-center">
              <div className="text-2xl text-primary">
                <CounterAnimation end={1000} suffix="+" />
              </div>
              <div className="text-sm text-muted-foreground">Beta Testers</div>
            </div>
            <div className="text-center">
              <div className="text-2xl text-primary">
                <CounterAnimation end={50} prefix="R$ " suffix="k" />
              </div>
              <div className="text-sm text-muted-foreground">Em Recompensas</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">24/7</div>
              <div className="text-sm text-muted-foreground">IA Criativa</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary/50 rounded-full p-1">
          <div className="w-1 h-3 bg-primary rounded-full mx-auto animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;