import { Bot, Image, Star, Users, Coins, Shield } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: Bot,
    title: "IA Criativa Avançada",
    description: "Nossa IA analisa milhares de filmes para criar sinopses únicas e originais que capturam a essência cinematográfica.",
    highlight: "GPT-4 Powered"
  },
  {
    icon: Image,
    title: "Geração de Imagens",
    description: "Crie pôsteres e cenas cinematográficas profissionais com nossa IA de imagens especializada em estética de cinema.",
    highlight: "HD Quality"
  },
  {
    icon: Star,
    title: "Sistema de Originalidade",
    description: "Algoritmo proprietário que detecta e recompensa criações verdadeiramente originais, evitando plágio e repetição.",
    highlight: "Anti-Plágio"
  },
  {
    icon: Users,
    title: "Comunidade Criativa",
    description: "Conecte-se com outros criadores, colabore em projetos e participe de desafios temáticos semanais.",
    highlight: "Colaborativo"
  },
  {
    icon: Coins,
    title: "Monetização Justa",
    description: "Sistema transparente de pontuação: 100 pontos = R$ 1,00. Ganhe através de curtidas, views e originalidade.",
    highlight: "Conversão Real"
  },
  {
    icon: Shield,
    title: "Segurança Total",
    description: "Proteção completa dos seus dados e criações com criptografia avançada e backup automático.",
    highlight: "Blockchain"
  }
];

const FeaturesSection = () => {
  return (
    <section className="py-20 px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Recursos Revolucionários
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Tecnologia de ponta para liberar todo o potencial da sua criatividade cinematográfica
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index}
              className="group relative bg-card hover:bg-gradient-card border-border hover:border-primary/40 transition-all duration-300 hover:shadow-cinema animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6">
                {/* Highlight Badge */}
                <div className="absolute top-4 right-4 px-2 py-1 bg-gradient-accent text-white text-xs font-medium rounded-full">
                  {feature.highlight}
                </div>

                {/* Icon */}
                <div className="mb-6">
                  <feature.icon className="h-12 w-12 text-primary group-hover:text-accent transition-colors group-hover:scale-110 transform duration-300" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold mb-4 text-foreground group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>

                {/* Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg pointer-events-none"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;