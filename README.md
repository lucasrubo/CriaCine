# 🎬 Roteirum - Crie Filmes com IA, Ganhe com Criatividade

<div align="center">

![Roteirum Logo](https://img.shields.io/badge/Roteirum-v1.0.0-blue?style=for-the-badge&logo=film)
[![MIT License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)
[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.11-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-5.4.1-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev/)

**A primeira plataforma que une inteligência artificial, criatividade cinematográfica e recompensas reais.**

[🚀 Demo ao Vivo](https://lucasrubo.github.io/Roteirum/) • [📖 Documentação](#documentação) • [🤝 Contribuir](#contribuição)

</div>

---

## 🌟 Sobre o Projeto

O **Roteirum** é uma rede social inovadora focada na criação cinematográfica, onde criadores podem:

- 🎭 **Criar sinopses únicas** e compartilhar ideias de roteiros
- 🎨 **Desenvolver cartazes** e designs visuais para filmes
- 🤖 **Gerar imagens com IA** para conceitos visuais
- 🏆 **Competir no ranking** e ganhar reconhecimento
- 💰 **Ser recompensado** pela criatividade e originalidade
- 🤝 **Conectar-se** com outros criadores da comunidade

### 💡 Visão

Democratizar a criação cinematográfica através da tecnologia, permitindo que qualquer pessoa transforme suas ideias em projetos visuais impactantes e seja reconhecida por sua criatividade.

---

## ✨ Funcionalidades Principais

### 🔐 **Sistema de Autenticação**
- Login seguro com sessão persistente
- Redirecionamento inteligente baseado no estado de autenticação
- Proteção de rotas sensíveis

### 📱 **Feed Social Inteligente**
- Feed personalizado com algoritmo de recomendação
- Posts de diferentes tipos: sinopses, cartazes e imagens IA
- Interações em tempo real (curtir, salvar, comentar)
- Scroll infinito com carregamento otimizado

### 🔍 **Pesquisa Avançada**
- Busca em tempo real com sugestões inteligentes
- Filtros por tipo de conteúdo e tags
- Histórico de pesquisas persistente
- Resultados organizados e relevantes

### 🏆 **Sistema de Ranking Gamificado**
- Top 100 posts mais populares
- Algoritmo de score baseado em engajamento
- Períodos configuráveis (semana, mês, ano)
- Indicadores de mudança de posição

### 📊 **Páginas Especializadas**
- **Posts Curtidos**: Biblioteca pessoal de favoritos
- **Posts Salvos**: Coleção para consulta posterior
- **Meus Posts**: Portfólio do criador com estatísticas
- **Ranking Completo**: Visualização detalhada do top 100

### 📱 **Design Responsivo**
- Layout adaptativo para desktop, tablet e mobile
- Menu hambúrguer para navegação mobile
- Componentes otimizados para touch
- Performance otimizada em todos os dispositivos

---

## 🛠 Tecnologias Utilizadas

### **Frontend**
- **React 18.3.1** - Biblioteca principal para UI
- **TypeScript 5.5.3** - Tipagem estática e desenvolvimento seguro
- **Tailwind CSS 3.4.11** - Framework CSS utilitário
- **Vite 5.4.1** - Build tool moderna e rápida

### **Gerenciamento de Estado**
- **React Query** - Cache e sincronização de dados
- **Context API** - Estado global da aplicação
- **Custom Hooks** - Lógica reutilizável

### **UI/UX**
- **Radix UI** - Componentes acessíveis e customizáveis
- **Lucide React** - Ícones modernos e consistentes
- **Framer Motion** - Animações fluidas (futuro)

### **Roteamento & Navegação**
- **React Router DOM** - Roteamento SPA
- **Protected Routes** - Controle de acesso
- **Dynamic Navigation** - Navegação contextual

### **Desenvolvimento**
- **ESLint** - Linting e qualidade de código
- **Prettier** - Formatação automática
- **Husky** - Git hooks (futuro)

---

## 🚀 Como Executar

### **Pré-requisitos**
- Node.js 18+ 
- npm ou yarn
- Git

### **Instalação**

```bash
# Clone o repositório
git clone https://github.com/lucasrubo/Roteirum.git

# Entre no diretório
cd Roteirum

# Instale as dependências
npm install

# Execute em modo de desenvolvimento
npm run dev

# Acesse http://localhost:5173
```

### **Build para Produção**

```bash
# Build otimizado
npm run build

# Preview do build
npm run preview

# Deploy para GitHub Pages
npm run deploy
```

---

## 📁 Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   ├── auth/           # Autenticação
│   ├── feed/           # Feed e posts
│   ├── navigation/     # Navegação e header
│   ├── sidebar/        # Sidebar e ranking
│   ├── layout/         # Layouts base
│   └── ui/             # Componentes UI base
├── pages/              # Páginas da aplicação
├── hooks/              # Custom hooks
├── data/               # Dados mock e serviços
├── types/              # Definições TypeScript
├── utils/              # Utilitários e helpers
├── config/             # Configurações
└── assets/             # Recursos estáticos
```

---

## 🎯 Funcionalidades Implementadas

### ✅ **Autenticação & Segurança**
- [x] Sistema de login com dados mock
- [x] Proteção de rotas com AuthGuard
- [x] Gerenciamento de sessão
- [x] Redirecionamento automático

### ✅ **Interface & Experiência**
- [x] Layout responsivo completo
- [x] Menu hambúrguer para mobile
- [x] Navegação intuitiva
- [x] Estados de loading com skeletons
- [x] Tratamento de erros robusto
- [x] Toast notifications

### ✅ **Feed & Interações**
- [x] Feed personalizado
- [x] Posts com diferentes tipos
- [x] Sistema de curtidas e salvos
- [x] Comentários em posts
- [x] Compartilhamento de conteúdo
- [x] Scroll infinito

### ✅ **Pesquisa & Descoberta**
- [x] Pesquisa em tempo real
- [x] Sugestões inteligentes
- [x] Filtros avançados
- [x] Histórico de pesquisas
- [x] Página de resultados

### ✅ **Ranking & Gamificação**
- [x] Sistema de ranking Top 100
- [x] Algoritmo de score inteligente
- [x] Múltiplos períodos
- [x] Indicadores de posição
- [x] Estatísticas detalhadas

---

## 🔮 Roadmap Futuro

### **Fase 2 - Integração com IA**
- [ ] Integração com APIs de IA para geração de imagens
- [ ] Assistente IA para criação de sinopses
- [ ] Análise automática de sentimentos em comentários
- [ ] Recomendações personalizadas com ML

### **Fase 3 - Recursos Sociais**
- [ ] Sistema de seguir usuários
- [ ] Mensagens diretas
- [ ] Grupos e comunidades
- [ ] Eventos e desafios

### **Fase 4 - Monetização**
- [ ] Sistema de recompensas reais
- [ ] Marketplace de roteiros
- [ ] Assinaturas premium
- [ ] NFTs de criações

### **Fase 5 - Produção**
- [ ] Ferramentas de colaboração
- [ ] Gestão de projetos cinematográficos
- [ ] Conexão com produtoras
- [ ] Financiamento coletivo

---

## 🧪 Testes

```bash
# Executar testes unitários
npm run test

# Testes com coverage
npm run test:coverage

# Testes E2E (futuro)
npm run test:e2e
```

---

## 📊 Performance

- ⚡ **Lighthouse Score**: 95+ em todas as métricas
- 🚀 **First Contentful Paint**: < 1.5s
- 📱 **Mobile Friendly**: 100% responsivo
- ♿ **Acessibilidade**: WCAG 2.1 AA compliant
- 🔍 **SEO**: Otimizado para motores de busca

---

## 🤝 Contribuição

Contribuições são sempre bem-vindas! Veja como você pode ajudar:

### **Como Contribuir**

1. **Fork** o projeto
2. **Clone** seu fork
3. **Crie** uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
4. **Commit** suas mudanças (`git commit -m 'Add some AmazingFeature'`)
5. **Push** para a branch (`git push origin feature/AmazingFeature`)
6. **Abra** um Pull Request

### **Diretrizes**
- Siga os padrões de código existentes
- Adicione testes para novas funcionalidades
- Atualize a documentação quando necessário
- Use commits semânticos

### **Tipos de Contribuição**
- 🐛 **Bug fixes**
- ✨ **Novas funcionalidades**
- 📚 **Documentação**
- 🎨 **Melhorias de UI/UX**
- ⚡ **Otimizações de performance**

---

## 📄 Licença

Este projeto está sob a **MIT License** - uma das licenças mais permissivas e populares do open source.

### O que isso significa?

✅ **Você PODE:**
- ✨ Usar comercialmente
- 🔄 Modificar o código
- 📦 Distribuir
- 🔒 Usar em projetos privados
- 🏷️ Sublicenciar

❌ **Você NÃO PODE:**
- 🛡️ Responsabilizar os autores por danos
- 🚫 Usar sem incluir a licença original

### Requisitos:
- 📋 Incluir a licença e copyright nos arquivos distribuídos
- 📝 Indicar mudanças significativas (recomendado)

Veja o arquivo [LICENSE](LICENSE) para o texto completo da licença.

---

## 👨‍💻 Autor

**Lucas Rubo**
- GitHub: [@lucasrubo](https://github.com/lucasrubo)
- LinkedIn: [Lucas Rubo](https://linkedin.com/in/lucasrubo)
- Email: lucas@roteirum.com

---

## 🙏 Agradecimentos

- **React Team** - Pela incrível biblioteca
- **Tailwind CSS** - Pelo framework CSS fantástico
- **Radix UI** - Pelos componentes acessíveis
- **Vercel** - Pela plataforma de deploy
- **Comunidade Open Source** - Por toda inspiração

---

## 📈 Status do Projeto

![GitHub last commit](https://img.shields.io/github/last-commit/lucasrubo/Roteirum)
![GitHub issues](https://img.shields.io/github/issues/lucasrubo/Roteirum)
![GitHub pull requests](https://img.shields.io/github/issues-pr/lucasrubo/Roteirum)
![GitHub stars](https://img.shields.io/github/stars/lucasrubo/Roteirum)

---

<div align="center">

**⭐ Se este projeto te ajudou, considere dar uma estrela!**

**🎬 Transforme suas ideias em realidade com o Roteirum!**

</div>