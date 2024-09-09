import { WatchedMovieList } from './WatchedMovieList';

export const WatchedList = ({ watched, deleteWatched }) => {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovieList
          movie={movie}
          key={movie.imdbID}
          deleteWatched={deleteWatched}
        />
      ))}
    </ul>
  );
};
