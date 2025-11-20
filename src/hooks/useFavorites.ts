import { useState, useEffect } from 'react';

const FAVORITES_KEY = 'company-favorites';

export function useFavorites() {
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  // Load favorites from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(FAVORITES_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setFavorites(new Set(parsed));
      } catch (error) {
        console.error('Failed to parse favorites:', error);
      }
    }
  }, []);

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(Array.from(favorites)));
  }, [favorites]);

  const toggleFavorite = (companyId: string) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(companyId)) {
        newFavorites.delete(companyId);
      } else {
        newFavorites.add(companyId);
      }
      return newFavorites;
    });
  };

  const isFavorite = (companyId: string) => favorites.has(companyId);

  const clearFavorites = () => {
    setFavorites(new Set());
  };

  return {
    favorites,
    toggleFavorite,
    isFavorite,
    clearFavorites,
    favoritesCount: favorites.size,
  };
}
