import { useState, useEffect } from 'react';
import { Key } from './App';
export const useMovies = (query, callback) => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  useEffect(() => {
    const controller = new AbortController();
    callback?.();
    const fetchMovies = async () => {
      try {
        setIsLoading(true);
        setError('');

        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${Key}&s=${query}`,
          {
            signal: controller.signal,
          }
        );
        if (!res.ok) throw new Error();
        const data = await res.json();
        if (data.Response === 'False') throw new Error('Movie not found');
        setMovies(data.Search);
      } catch (error) {
        if (error.name !== 'AbortError') {
          setError(error.message);
        }
      } finally {
        setIsLoading(false);
      }
    };
    if (query.length < 3) {
      setMovies([]);
      setError('');
      return;
    }
    fetchMovies();
    return () => {
      controller.abort();
    };
  }, [query]);

  return { movies, isLoading, error };
};
