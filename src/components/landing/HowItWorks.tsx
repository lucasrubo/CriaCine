import { Lightbulb, Wand2, Trophy, DollarSign } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const steps = [
  {
    icon: Lightbulb,
    title: "Imagine",
    description: "Tenha uma ideia criativa para um filme fictício. Pode ser qualquer gênero, época ou estilo.",
    color: "text-primary"
  },
  {
    icon: Wand2,
    title: "Crie com IA",
    description: "Use nossa IA para gerar sinopses envolventes e imagens cinematográficas profissionais.",
    color: "text-accent"
  },
  {
    icon: Trophy,
    title: "Publique & Compete",
    description: "Compartilhe sua criação e receba pontos por curtidas, visualizações e originalidade.",
    color: "text-primary"
  },
  {
    icon: DollarSign,
    title: "Ganhe Dinheiro",
    description: "Converta seus pontos em dinheiro real ou use para criar mais conteúdo premium.",
    color: "text-accent"
  }
];

const HowItWorks = () => {
  return (
    <section className="py-20 px-6 bg-gradient-card">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Como Funciona o CineCria
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Transforme sua criatividade em uma fonte de renda com nossa plataforma inovadora
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <Card 
              key={index} 
              className="relative bg-card/80 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-glow animate-fade-in group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6 text-center">
                {/* Step Number */}
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gradient-accent rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {index + 1}
                </div>

                {/* Icon */}
                <div className="mb-6 mt-4">
                  <step.icon className={`h-12 w-12 mx-auto ${step.color} group-hover:scale-110 transition-transform`} />
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold mb-4 text-foreground">
                  {step.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Connection Lines (Hidden on mobile) */}
        <div className="hidden lg:block relative -mt-16">
          <div className="absolute top-8 left-1/4 w-1/4 h-0.5 bg-gradient-to-r from-primary to-accent opacity-30"></div>
          <div className="absolute top-8 left-2/4 w-1/4 h-0.5 bg-gradient-to-r from-accent to-primary opacity-30"></div>
          <div className="absolute top-8 left-3/4 w-1/4 h-0.5 bg-gradient-to-r from-primary to-accent opacity-30"></div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;