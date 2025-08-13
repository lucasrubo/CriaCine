import { useState, useEffect } from 'react';

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((val: T) => T)) => void] {
  // Estado para armazenar o valor
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      // Obtém do localStorage
      const item = window.localStorage.getItem(key);
      // Parse do JSON armazenado ou retorna valor inicial
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // Se erro, retorna valor inicial
      console.error(`Erro ao ler localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Função para definir valor
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // Permite que value seja uma função para que tenhamos a mesma API do useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      
      // Salva no estado
      setStoredValue(valueToStore);
      
      // Salva no localStorage
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Erro ao salvar no localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue];
}

// Hook específico para preferências do usuário
export function useUserPreferences() {
  const [preferences, setPreferences] = useLocalStorage('roteirum_preferences', {
    theme: 'dark',
    language: 'pt-BR',
    notifications: true,
    autoPlay: false,
  });

  return { preferences, setPreferences };
}

// Hook para histórico de pesquisas
export function useSearchHistory() {
  const [searchHistory, setSearchHistory] = useLocalStorage<string[]>('roteirum_search_history', []);

  const addSearch = (query: string) => {
    if (query.trim() && !searchHistory.includes(query)) {
      const newHistory = [query, ...searchHistory.slice(0, 9)]; // Mantém apenas 10 itens
      setSearchHistory(newHistory);
    }
  };

  const clearHistory = () => {
    setSearchHistory([]);
  };

  return { searchHistory, addSearch, clearHistory };
}