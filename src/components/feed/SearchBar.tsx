import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { useSearchHistory } from '@/hooks/useLocalStorage';
import { searchPosts } from '@/data/mockPosts';
import { 
  Search, 
  X, 
  Clock, 
  Hash,
  User,
  FileText,
  Image as ImageIcon,
  Film
} from 'lucide-react';
import { PostType } from '@/types';

interface SearchBarProps {
  onSearch?: (query: string) => void;
  placeholder?: string;
  className?: string;
  showSuggestions?: boolean;
  autoFocus?: boolean;
}

interface SearchSuggestion {
  type: 'post' | 'tag' | 'user' | 'history';
  value: string;
  label: string;
  icon?: React.ReactNode;
  data?: any;
}

const SearchBar = ({
  onSearch,
  placeholder = "Pesquisar posts, usuários, tags...",
  className = '',
  showSuggestions = true,
  autoFocus = false
}: SearchBarProps) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();
  const { searchHistory, addSearch } = useSearchHistory();
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  // Tags populares (simulado)
  const popularTags = [
    'ficção-científica', 'thriller', 'drama', 'fantasia', 
    'ia', 'cyberpunk', 'mistério', 'terror'
  ];

  // Gera sugestões baseadas na query
  const generateSuggestions = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      // Mostra histórico e tags populares quando não há query
      const historySuggestions: SearchSuggestion[] = searchHistory.slice(0, 3).map(item => ({
        type: 'history',
        value: item,
        label: item,
        icon: <Clock className="h-4 w-4" />
      }));

      const tagSuggestions: SearchSuggestion[] = popularTags.slice(0, 4).map(tag => ({
        type: 'tag',
        value: tag,
        label: `#${tag}`,
        icon: <Hash className="h-4 w-4" />
      }));

      setSuggestions([...historySuggestions, ...tagSuggestions]);
      return;
    }

    setIsLoading(true);
    
    try {
      // Simula delay de busca
      await new Promise(resolve => setTimeout(resolve, 200));
      
      const results = searchPosts(searchQuery);
      const newSuggestions: SearchSuggestion[] = [];

      // Adiciona posts encontrados
      results.slice(0, 5).forEach(post => {
        const typeIcon = getPostTypeIcon(post.type);
        newSuggestions.push({
          type: 'post',
          value: post.title,
          label: post.title,
          icon: typeIcon,
          data: post
        });
      });

      // Adiciona tags que fazem match
      const matchingTags = popularTags.filter(tag => 
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      );
      
      matchingTags.slice(0, 3).forEach(tag => {
        newSuggestions.push({
          type: 'tag',
          value: tag,
          label: `#${tag}`,
          icon: <Hash className="h-4 w-4" />
        });
      });

      // Adiciona usuários (simulado)
      if (searchQuery.toLowerCase().includes('lucas') || searchQuery.toLowerCase().includes('ana')) {
        newSuggestions.push({
          type: 'user',
          value: searchQuery,
          label: `Buscar usuários: "${searchQuery}"`,
          icon: <User className="h-4 w-4" />
        });
      }

      setSuggestions(newSuggestions);
    } finally {
      setIsLoading(false);
    }
  }, [searchHistory]);

  const getPostTypeIcon = (type: PostType) => {
    switch (type) {
      case 'synopsis':
        return <FileText className="h-4 w-4" />;
      case 'poster':
        return <ImageIcon className="h-4 w-4" />;
      case 'ai-image':
        return <Film className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  // Debounce para sugestões
  useEffect(() => {
    const timer = setTimeout(() => {
      if (showSuggestions && isOpen) {
        generateSuggestions(query);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query, isOpen, showSuggestions, generateSuggestions]);

  // Fecha sugestões ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current && 
        !suggestionsRef.current.contains(event.target as Node) &&
        !inputRef.current?.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Navegação por teclado
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen || suggestions.length === 0) {
      if (e.key === 'Enter') {
        handleSearch();
      }
      return;
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev > 0 ? prev - 1 : suggestions.length - 1
        );
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0) {
          handleSuggestionClick(suggestions[selectedIndex]);
        } else {
          handleSearch();
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setSelectedIndex(-1);
        break;
    }
  };

  const handleSearch = () => {
    if (!query.trim()) return;

    addSearch(query);
    setIsOpen(false);
    setSelectedIndex(-1);

    if (onSearch) {
      onSearch(query);
    } else {
      // Navega para página de resultados
      navigate(`/Roteirum/search?q=${encodeURIComponent(query)}`);
    }
  };

  const handleSuggestionClick = (suggestion: SearchSuggestion) => {
    setQuery(suggestion.value);
    setIsOpen(false);
    setSelectedIndex(-1);

    if (suggestion.type === 'post' && suggestion.data) {
      // Navega para o post específico (futura implementação)
      navigate(`/Roteirum/post/${suggestion.data.id}`);
    } else if (suggestion.type === 'tag') {
      navigate(`/Roteirum/search?tag=${encodeURIComponent(suggestion.value)}`);
    } else {
      addSearch(suggestion.value);
      if (onSearch) {
        onSearch(suggestion.value);
      } else {
        navigate(`/Roteirum/search?q=${encodeURIComponent(suggestion.value)}`);
      }
    }
  };

  const clearQuery = () => {
    setQuery('');
    setIsOpen(false);
    inputRef.current?.focus();
  };

  return (
    <div className={`relative ${className}`}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          className="h-9 pl-10 pr-10 bg-background/50 backdrop-blur-sm border-border/50 focus:border-primary/50 text-sm"
          autoFocus={autoFocus}
        />
        {query && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearQuery}
            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 hover:bg-muted"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Sugestões */}
      {showSuggestions && isOpen && (
        <Card 
          ref={suggestionsRef}
          className="absolute top-full left-0 right-0 mt-1 z-50 max-h-80 overflow-y-auto bg-card/95 backdrop-blur-sm border-border/50 shadow-lg"
        >
          <CardContent className="p-2">
            {isLoading ? (
              <div className="flex items-center justify-center py-4">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                <span className="ml-2 text-sm text-muted-foreground">Buscando...</span>
              </div>
            ) : suggestions.length > 0 ? (
              <div className="space-y-1">
                {suggestions.map((suggestion, index) => (
                  <button
                    key={`${suggestion.type}-${suggestion.value}-${index}`}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className={`w-full flex items-center space-x-2 px-2 py-1.5 rounded-md text-left hover:bg-muted/50 transition-colors ${
                      index === selectedIndex ? 'bg-muted' : ''
                    }`}
                  >
                    <div className="text-muted-foreground">
                      {suggestion.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm truncate">
                        {suggestion.label}
                      </p>
                      {suggestion.type === 'post' && suggestion.data && (
                        <p className="text-xs text-muted-foreground truncate">
                          por {suggestion.data.author.name}
                        </p>
                      )}
                    </div>
                    {suggestion.type === 'history' && (
                      <Badge variant="secondary" className="text-xs">
                        Recente
                      </Badge>
                    )}
                    {suggestion.type === 'tag' && (
                      <Badge variant="outline" className="text-xs">
                        Tag
                      </Badge>
                    )}
                  </button>
                ))}
              </div>
            ) : query ? (
              <div className="text-center py-4">
                <p className="text-sm text-muted-foreground">
                  Nenhuma sugestão encontrada
                </p>
                <Button
                  variant="link"
                  size="sm"
                  onClick={handleSearch}
                  className="mt-2"
                >
                  Buscar por "{query}"
                </Button>
              </div>
            ) : (
              <div className="py-2">
                <p className="text-xs text-muted-foreground mb-2 px-3">
                  Pesquisas recentes e tags populares
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SearchBar;