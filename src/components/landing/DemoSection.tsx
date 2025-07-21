import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Wand2, Sparkles, Clock, Heart, Eye } from "lucide-react";

const DemoSection = () => {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedSynopsis, setGeneratedSynopsis] = useState("");

  const exampleSynopsis = {
    title: "O Último Projecionista",
    genre: "Drama Sci-Fi",
    synopsis: "Em 2045, quando os cinemas foram substituídos por experiências de realidade virtual, Marcus é o último projecionista do mundo. Trabalhando em um cinema abandonado no centro de uma metrópole futurista, ele descobre que os filmes antigos contêm códigos secretos deixados pelos primeiros cineastas. Quando uma corporação tenta destruir o cinema para construir um datacenter, Marcus deve decifrar essas mensagens antes que a magia do cinema seja perdida para sempre.",
    aiScore: 98,
    likes: 2847,
    views: 15420
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    // Simular geração por IA
    setTimeout(() => {
      setGeneratedSynopsis(`Uma história fascinante baseada em: "${prompt}". Em um mundo onde...`);
      setIsGenerating(false);
    }, 3000);
  };

  return (
    <section className="py-20 px-6 bg-gradient-card">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Veja a IA em Ação
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Experimente nosso gerador de sinopses e descubra como a inteligência artificial pode amplificar sua criatividade
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Demo Generator */}
          <Card className="bg-card/80 backdrop-blur-sm border-primary/20 animate-slide-in-left">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl text-foreground">
                <Wand2 className="mr-3 h-6 w-6 text-primary" />
                Gerador de Sinopses
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2 text-foreground">
                  Descreva sua ideia de filme:
                </label>
                <Textarea
                  placeholder="Ex: Um detetive que pode viajar no tempo investiga crimes do passado..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="min-h-[120px] bg-background/50 border-border focus:border-primary"
                />
              </div>

              <Button 
                onClick={handleGenerate}
                disabled={!prompt.trim() || isGenerating}
                className="w-full h-12 bg-gradient-accent text-white font-semibold hover:scale-105 transition-transform"
              >
                {isGenerating ? (
                  <>
                    <Sparkles className="mr-2 h-5 w-5 animate-spin" />
                    Gerando com IA...
                  </>
                ) : (
                  <>
                    <Wand2 className="mr-2 h-5 w-5" />
                    Gerar Sinopse
                  </>
                )}
              </Button>

              {generatedSynopsis && (
                <Card className="bg-background/50 border-primary/30 animate-fade-in">
                  <CardContent className="p-4">
                    <h4 className="font-semibold mb-2 text-foreground">Sinopse Gerada:</h4>
                    <p className="text-muted-foreground italic">{generatedSynopsis}</p>
                  </CardContent>
                </Card>
              )}
            </CardContent>
          </Card>

          {/* Example Post */}
          <Card className="bg-card/80 backdrop-blur-sm border-primary/20 animate-slide-in-right">
            <CardHeader>
              <CardTitle className="text-2xl text-foreground">Exemplo de Criação</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Movie Poster Placeholder */}
              <div className="aspect-[2/3] bg-gradient-to-br from-accent to-primary rounded-lg flex items-center justify-center text-white font-bold text-xl">
                Pôster Gerado por IA
              </div>

              {/* Movie Info */}
              <div>
                <h3 className="text-xl font-bold text-foreground mb-2">{exampleSynopsis.title}</h3>
                <span className="inline-block px-3 py-1 bg-primary/20 text-primary text-sm rounded-full mb-4">
                  {exampleSynopsis.genre}
                </span>
                <p className="text-muted-foreground leading-relaxed text-sm mb-4">
                  {exampleSynopsis.synopsis}
                </p>
              </div>

              {/* Stats */}
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Heart className="h-4 w-4 mr-1 text-red-500" />
                    {exampleSynopsis.likes.toLocaleString()}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Eye className="h-4 w-4 mr-1" />
                    {exampleSynopsis.views.toLocaleString()}
                  </div>
                </div>
                <div className="flex items-center">
                  <Sparkles className="h-4 w-4 mr-1 text-primary" />
                  <span className="text-sm font-semibold text-primary">
                    {exampleSynopsis.aiScore}% Original
                  </span>
                </div>
              </div>

              {/* Earnings */}
              <Card className="bg-gradient-accent text-white">
                <CardContent className="p-4 text-center">
                  <Clock className="h-6 w-6 mx-auto mb-2" />
                  <div className="text-lg font-bold">R$ 42,35</div>
                  <div className="text-sm opacity-90">Ganhos desta criação</div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default DemoSection;