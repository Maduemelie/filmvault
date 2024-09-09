import { useState, useEffect, useRef } from 'react';
import { Key } from './App';
import { Loader } from './Loader';
import { StarRatings } from './StarRatings';
import { useKey } from './useKey';

export const MovieDetails = ({
  id,
  setSelectedId,
  onAddWatched,
  watched,
  onCloseMovie,
}) => {
  const [movie, setMovie] = useState({});
  const [userRating, setUserRating] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const handleAdd = () => {
    const newWatchedMovie = {
      imdbID: id,
      title,
      poster,
      runtime: Number(runtime.split(' ').at(0)),
      imdbRating: Number(imdbRating),
      userRating,
      countRatingsDecisions: countRef.current,
    };
    onAddWatched(newWatchedMovie);
    setSelectedId(null);
  };
  const countRef = useRef(0);

  useEffect(() => {
    if (userRating) countRef.current++;
  }, [userRating]);

  const isWatched = watched.map((movie) => movie.imdbID).includes(id);

  const watchedUserRating = watched.find(
    (movie) => movie.imdbID === id
  )?.userRating;

  const {
    Title: title,
    // Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;

  useKey('Escape', onCloseMovie);
  useEffect(() => {
    const fetchMovieDetails = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${Key}&i=${id}`
        );
        const data = await res.json();
        console.log(data);
        setMovie(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching movie details:', error);
        setIsLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  useEffect(() => {
    if (!title) return;
    document.title = `Movie | ${title}`;
    return () => {
      document.title = 'FilmVault';
    };
  }, [title]);

  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={() => setSelectedId(null)}>
              ←
            </button>

            <img src={poster} alt={`${title} poster`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} | {genre} | {runtime}
              </p>
              <p>
                <span>⭐️</span>
                {imdbRating} IMDb rating
              </p>
            </div>
          </header>

          <section>
            <div className="rating">
              {isWatched ? (
                <p>
                  You have watched and rated this movie {watchedUserRating}
                  <span>⭐</span>
                </p>
              ) : (
                <>
                  <StarRatings
                    maxRating={10}
                    size={15}
                    onSetRating={setUserRating}
                  />
                  {userRating > 0 && (
                    <button className="btn-add" onClick={handleAdd}>
                      + Add to list
                    </button>
                  )}
                </>
              )}
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p> Starring {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      )}
    </div>
  );
};
