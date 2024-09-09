import { useState, useEffect } from 'react';
import { MovieSummary } from './MovieSummary';
import { MovieDetails } from './MovieDetails';
import { MovieList } from './MovieList';
import { NavBar } from './NavBar';
import { WatchedList } from './WatchedList';
import { SearchBox } from './SearchBox';
import { NumResults } from './NumResults';
import { Logo } from './Logo';
import { Box } from './Box';
import { Loader } from './Loader';
import { ErrorMessage } from './ErrorMessage';

export const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);
export const Key = '6eb28931';
// const tempQuery = 'interstellar';
export default function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [query, setQuery] = useState('inception');
  const [selectedId, setSelectedId] = useState(null);

  const handleAddWatched = (movie) => {
    setWatched((watched) => [...watched, movie]);
  };
  const deleteWatched = (id) => {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  };

  useEffect(() => {
    const controller = new AbortController();
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
  return (
    <>
      <NavBar>
        <Logo />
        <SearchBox query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </NavBar>

      <main className="main">
        <Box>
          {error ? (
            <ErrorMessage message={error} />
          ) : isLoading ? (
            <Loader />
          ) : (
            <MovieList movies={movies} setSelectedId={setSelectedId} />
          )}
        </Box>
        <Box>
          {selectedId ? (
            <MovieDetails
              id={selectedId}
              setSelectedId={setSelectedId}
              watched={watched}
              onAddWatched={handleAddWatched}
            />
          ) : (
            <>
              <MovieSummary watched={watched} />
              <WatchedList watched={watched} deleteWatched={deleteWatched} />
            </>
          )}
        </Box>
      </main>
    </>
  );
}
