import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "Como a IA garante que meu conteúdo é original?",
    answer: "Nossa IA usa algoritmos avançados de análise semântica para comparar sua criação com milhões de obras existentes. O sistema detecta similaridades e atribui uma pontuação de originalidade. Quanto mais única for sua criação, maior será sua recompensa em pontos."
  },
  {
    question: "Posso realmente ganhar dinheiro criando filmes fictícios?",
    answer: "Sim! O CineCria tem uma economia real onde 100 pontos equivalem a R$ 1,00. Você ganha pontos através de curtidas, visualizações, originalidade e engajamento. Os saques são processados instantaneamente via PIX quando você atingir o mínimo de 500 pontos (R$ 5,00)."
  },
  {
    question: "A IA vai substituir minha criatividade?",
    answer: "Não! A IA é uma ferramenta para amplificar sua criatividade, não substituí-la. Você fornece as ideias, direção e conceitos únicos. A IA ajuda na estruturação, geração de imagens e otimização do conteúdo, mas a criatividade e originalidade vêm de você."
  },
  {
    question: "Como funciona o sistema anti-plágio?",
    answer: "Utilizamos tecnologia blockchain para registrar todas as criações com timestamp imutável. Nossa IA compara automaticamente cada nova postagem com todo o conteúdo existente, detectando tentativas de plágio e protegendo os criadores originais."
  },
  {
    question: "Existe limite para quantos filmes posso criar?",
    answer: "Depende do seu nível de usuário. Iniciantes podem criar 2 postagens por dia, enquanto Cineastas (1000+ pontos) têm criação ilimitada. Cada postagem custa 10 pontos, incentivando qualidade sobre quantidade."
  },
  {
    question: "Quando a plataforma estará disponível?",
    answer: "Estamos finalizando os testes beta. Os primeiros da lista de espera terão acesso exclusivo em março de 2024. O lançamento público está previsto para junho de 2024, com todos os recursos completos incluindo marketplace e NFTs."
  },
  {
    question: "Meus dados e criações estão seguros?",
    answer: "Absolutamente. Usamos criptografia AES-256, backup automático em múltiplos servidores e tecnologia blockchain para garantir que suas criações sejam protegidas. Você mantém todos os direitos autorais sobre seu conteúdo."
  },
  {
    question: "Posso colaborar com outros criadores?",
    answer: "Sim! Estamos desenvolvendo ferramentas de colaboração que permitirão criar filmes em equipe, dividir automaticamente os pontos ganhos e até mesmo formar estúdios virtuais com outros criadores."
  }
];

const FAQSection = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <section className="py-20 px-6 bg-gradient-card">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Perguntas Frequentes
          </h2>
          <p className="text-xl text-muted-foreground">
            Tire suas dúvidas sobre o CineCria e descubra como começar a ganhar com sua criatividade
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <Card 
              key={index}
              className="bg-card/80 backdrop-blur-sm border-border hover:border-primary/40 transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <CardContent className="p-0">
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-background/50 transition-colors"
                >
                  <h3 className="text-lg font-semibold text-foreground pr-4">
                    {faq.question}
                  </h3>
                  <ChevronDown 
                    className={`h-5 w-5 text-primary transition-transform ${
                      openItems.includes(index) ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                
                {openItems.includes(index) && (
                  <div className="px-6 pb-6 animate-fade-in">
                    <p className="text-muted-foreground leading-relaxed border-t border-border pt-4">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="text-center mt-12 animate-fade-in">
          <Card className="bg-gradient-accent text-white">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">
                Ainda tem dúvidas?
              </h3>
              <p className="mb-6 text-white/90">
                Nossa equipe está pronta para ajudar você a entender melhor o CineCria
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="mailto:contato@cinecria.com" 
                  className="px-6 py-3 bg-white text-primary font-semibold rounded-lg hover:bg-white/90 transition-colors"
                >
                  Falar com Especialista
                </a>
                <a 
                  href="#" 
                  className="px-6 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-primary transition-colors"
                >
                  Agendar Demo
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;