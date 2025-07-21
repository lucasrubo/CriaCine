const SystemApp = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-12 text-center">
        <h1 className="text-4xl font-bold mb-6 text-primary">CineCria Sistema</h1>
        <p className="text-xl text-muted-foreground mb-8">
          Em breve: O sistema completo da plataforma CineCria
        </p>
        <div className="bg-card rounded-lg p-8 max-w-2xl mx-auto">
          <p className="text-muted-foreground">
            Esta será a área do sistema principal onde os usuários poderão:
          </p>
          <ul className="list-disc list-inside mt-4 space-y-2 text-left">
            <li>Criar sinopses com IA</li>
            <li>Gerar imagens cinematográficas</li>
            <li>Publicar no feed</li>
            <li>Gerenciar pontuação</li>
            <li>Ver rankings</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SystemApp;