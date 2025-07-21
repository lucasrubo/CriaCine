import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Coins, TrendingUp, Gift, Crown } from "lucide-react";

const economyData = [
  {
    action: "Curtida recebida",
    points: "+1",
    icon: "👍",
    color: "text-green-500"
  },
  {
    action: "Visualização única",
    points: "+0.5",
    icon: "👁️",
    color: "text-blue-500"
  },
  {
    action: "Alta originalidade (IA)",
    points: "+2 a +5",
    icon: "✨",
    color: "text-purple-500"
  },
  {
    action: "Compartilhamento",
    points: "+3",
    icon: "🔄",
    color: "text-orange-500"
  },
  {
    action: "Comentário construtivo",
    points: "+2",
    icon: "💬",
    color: "text-cyan-500"
  },
  {
    action: "Criar nova postagem",
    points: "-10",
    icon: "📝",
    color: "text-red-500"
  }
];

const tiers = [
  {
    name: "Iniciante",
    points: "0 - 100",
    benefits: ["2 postagens por dia", "IA básica", "Suporte padrão"],
    badge: "🌱",
    color: "border-green-500"
  },
  {
    name: "Criador",
    points: "100 - 500", 
    benefits: ["5 postagens por dia", "IA avançada", "Analytics básicos"],
    badge: "🎬",
    color: "border-blue-500"
  },
  {
    name: "Artista",
    points: "500 - 1000",
    benefits: ["10 postagens por dia", "IA premium", "Analytics completos"],
    badge: "🎨",
    color: "border-purple-500"
  },
  {
    name: "Cineasta",
    points: "1000+",
    benefits: ["Postagens ilimitadas", "IA exclusiva", "Suporte VIP"],
    badge: "👑",
    color: "border-primary"
  }
];

const PricingSection = () => {
  return (
    <section className="py-20 px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Sistema de Pontuação
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Entenda como funciona nossa economia criativa transparente e justa
          </p>
        </div>

        {/* Conversion Rate */}
        <Card className="max-w-md mx-auto mb-12 bg-gradient-accent text-white animate-fade-in">
          <CardContent className="p-6 text-center">
            <Coins className="h-12 w-12 mx-auto mb-4" />
            <div className="text-3xl font-bold mb-2">100 Pontos = R$ 1,00</div>
            <div className="text-white/80">Taxa de conversão fixa e transparente</div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Economy Actions */}
          <div className="animate-slide-in-left">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl text-foreground">
                  <TrendingUp className="mr-3 h-6 w-6 text-primary" />
                  Como Ganhar Pontos
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {economyData.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-background/50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{item.icon}</span>
                      <span className="text-foreground">{item.action}</span>
                    </div>
                    <Badge variant="secondary" className={`${item.color} font-semibold`}>
                      {item.points}
                    </Badge>
                  </div>
                ))}

                <div className="mt-6 p-4 bg-primary/10 rounded-lg border border-primary/20">
                  <div className="flex items-center text-primary mb-2">
                    <Gift className="h-5 w-5 mr-2" />
                    <span className="font-semibold">Bônus Especiais</span>
                  </div>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Trending semanal: +50 pontos</li>
                    <li>• Desafio temático: +25 pontos</li>
                    <li>• Primeira postagem do dia: +5 pontos</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* User Tiers */}
          <div className="animate-slide-in-right">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl text-foreground">
                  <Crown className="mr-3 h-6 w-6 text-primary" />
                  Níveis de Usuário
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {tiers.map((tier, index) => (
                  <div key={index} className={`p-4 border-2 ${tier.color} rounded-lg bg-gradient-to-r from-background to-card`}>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl">{tier.badge}</span>
                        <div>
                          <h4 className="font-semibold text-foreground">{tier.name}</h4>
                          <p className="text-sm text-muted-foreground">{tier.points} pontos</p>
                        </div>
                      </div>
                    </div>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {tier.benefits.map((benefit, i) => (
                        <li key={i}>• {benefit}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12 animate-fade-in">
          <div className="max-w-2xl mx-auto p-6 bg-gradient-card rounded-lg border border-primary/20">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Pronto para Monetizar sua Criatividade?
            </h3>
            <p className="text-muted-foreground mb-6">
              Junte-se à nossa lista de espera e seja um dos primeiros a experimentar a economia criativa do futuro.
            </p>
            <div className="flex items-center justify-center space-x-6 text-sm text-muted-foreground">
              <div className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                Sem taxas ocultas
              </div>
              <div className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                Saques instantâneos
              </div>
              <div className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                100% transparente
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;