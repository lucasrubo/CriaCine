import { useState, useCallback } from 'react';

export interface Toast {
  id: string;
  title?: string;
  description: string;
  type: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
}

export const useToast = () => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((toast: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newToast: Toast = {
      id,
      duration: 3000,
      ...toast
    };

    setToasts(prev => [...prev, newToast]);

    // Remove automaticamente após a duração
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, newToast.duration);

    return id;
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const toast = useCallback((description: string, type: Toast['type'] = 'info', title?: string) => {
    return addToast({ description, type, title });
  }, [addToast]);

  return {
    toasts,
    toast,
    addToast,
    removeToast,
    success: (description: string, title?: string) => toast(description, 'success', title),
    error: (description: string, title?: string) => toast(description, 'error', title),
    warning: (description: string, title?: string) => toast(description, 'warning', title),
    info: (description: string, title?: string) => toast(description, 'info', title),
  };
};