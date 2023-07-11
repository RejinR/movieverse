import { Movie } from '@entity/movie.entity';
import { MovieDto } from '@interfaces/movies.interface';

export const transformMovieDtoFrom = async (movies: Movie) => {
  const genres = await movies.genres;
  const stars = await movies.stars;
  const movie: MovieDto = {
    id: movies.id,
    title: movies.title,
    releaseYear: movies.releaseYear,
    duration: movies.duration,
    rating: movies.rating,
    numberOfVotes: movies.numberOfVotes,
    gross: movies.gross,
    overview: movies.overview,
    link: movies.link,
    certificate: movies.certificate,
    genres: genres.map((aGenre) => ({ id: aGenre.id, name: aGenre.name })),
    stars: stars.map((aStar) => ({ id: aStar.id, name: aStar.name })),
    director: movies.director,
  };
  return movie;
};
