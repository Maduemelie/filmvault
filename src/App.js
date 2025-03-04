import { useState } from 'react';
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
import { useMovies } from './useMovies';
import { useLocalStorageState } from './useLocalStorageState';

export const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);
export const Key = '6eb28931';
// const tempQuery = 'interstellar';
export default function App() {
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState(null);

  const [watched, setWatched] = useLocalStorageState([], 'watched');

  const { movies, isLoading, error } = useMovies(query, handleCloseMovie);

  const handleAddWatched = (movie) => {
    setWatched((watched) => [...watched, movie]);
  };
  function handleCloseMovie(id) {
    setSelectedId(null);
  }
  const deleteWatched = (id) => {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  };

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
              onCloseMovie={handleCloseMovie}
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
