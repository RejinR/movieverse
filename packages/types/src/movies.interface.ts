import { GenreDto } from "./genre.interface";
import { PersonDto } from "./person.interface";

export enum Certificate {
  A = 'A',
  UA = 'UA',
  APPROVED = 'Approved',
  U = 'U',
  PG_13 = 'PG-13',
  R = 'R',
  G = 'G',
  TV_14 = 'TV-14',
  PASSED = 'Passed',
  PG = 'PG',
  GP = 'GP',
  TV_PG = 'TV-PG',
  TV_MA = 'TV-MA',
  MA_16 = '16',
  NA = 'N/A',
  UNRATED = 'Unrated',
  NOT_RATED = 'Not Rated',
  X = 'X',
}

export interface MovieDto {
  id: number;
  title: string;
  releaseYear: number;
  duration: number; // in minutes
  rating: number; // in minutes
  numberOfVotes: number;
  gross: number;
  overview: string;
  link: string;
  certificate: string;
  genres: GenreDto[];
  stars: PersonDto[];
  director: PersonDto;

}
