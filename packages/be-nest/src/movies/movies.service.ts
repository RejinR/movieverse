import { OmdbResponse } from '@interfaces/omdb.interface';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { parseCSV } from '@utils/csv-parser.util';
import axios from 'axios';
import { GenresService } from 'src/genre/genre.service';
import { Readable } from 'stream';
import { blue, yellow, red, green } from 'chalk';
import { PersonService } from 'src/person/person.service';
import { Repository } from 'typeorm';
import { Genre } from '../genre/genre.entity';
import { Person } from '../person/person.entity';
import { Movie } from './movie.entity';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private moviesRepository: Repository<Movie>,
    private genreService: GenresService,
    private personService: PersonService,
  ) {}

  findAll(): Promise<Movie[]> {
    return this.moviesRepository.find();
  }

  findOne(id: number): Promise<Movie | null> {
    return this.moviesRepository.findOneBy({ id });
  }

  findByTitle(title: string): Promise<Movie | null> {
    return this.moviesRepository.findOneBy({ title });
  }

  async remove(id: number): Promise<void> {
    await this.moviesRepository.delete(id);
  }

  seedDatabase = async (file: Express.Multer.File) => {
    const stream = Readable.from(file.buffer);
    const result = await parseCSV(stream);
    for (let i = 1; i < result.length; i += 1) {
      console.log(blue(`processing row ${i} of ${result.length - 2}`));
      const aMovie = result[i];
      const movieTitle = aMovie[1];
      const existingMovie = await this.findByTitle(movieTitle);
      if (existingMovie) {
        console.log(yellow(`movie already exists in db: ${movieTitle}`));
        continue;
      }
      await this.fetchMovieDetailsAndInsert(movieTitle);
    }
  };

  processGenreString = async (genres: string): Promise<Genre[]> => {
    const genreArr = genres.split(', ');
    let genresEnt: Genre[] = [];
    if (genreArr) {
      for (let i = 0; i < genreArr.length; i += 1) {
        const genre = await this.genreService.getOrCreateGenre(genreArr[i]);
        genresEnt = genresEnt.concat(genre);
      }
    }
    return genresEnt;
  };

  processStarsString = async (stars: string): Promise<Genre[]> => {
    const starsArr = stars.split(', ');
    let starsEnt: Person[] = [];
    if (starsArr) {
      for (let i = 0; i < starsArr.length; i += 1) {
        const person = await this.personService.getOrCreatePerson(starsArr[i]);
        starsEnt = starsEnt.concat(person);
      }
    }
    return starsEnt;
  };

  fetchMovieDetailsAndInsert = async (movieTitle: string) => {
    const response = await axios.get<OmdbResponse>('http://www.omdbapi.com', {
      params: { apikey: '329a7aa8', t: movieTitle },
    });
    const omdbResp = response.data;
    if (omdbResp.Response !== 'True') {
      console.log(red(`movie title not found in omdb: ${movieTitle}`));
      return;
    }
    const genres = await this.processGenreString(omdbResp.Genre);
    const stars = await this.processStarsString(omdbResp.Actors);
    const director = await this.personService.getOrCreatePerson(
      omdbResp.Director,
    );
    const movie: Movie = this.moviesRepository.create({
      title: movieTitle,
      releaseYear: omdbResp.Year.includes('–')
        ? +omdbResp.Year.split('–')[0]
        : +omdbResp.Year,
      duration:
        omdbResp.Runtime && omdbResp.Runtime !== 'N/A'
          ? +omdbResp.Runtime.split('min')[0].trim()
          : 0,
      rating: +omdbResp.imdbRating,
      numberOfVotes: +omdbResp.imdbVotes.split(',').join(''),
      gross:
        omdbResp.BoxOffice && omdbResp.BoxOffice !== 'N/A'
          ? +omdbResp.BoxOffice.substring(1).split(',').join('')
          : 0,
      overview: omdbResp.Plot,
      link: omdbResp.Poster,
      certificate: omdbResp.Rated,
      genres: Promise.resolve([genres]),
      stars,
      director,
    });
    try {
      await this.moviesRepository.save(movie);
    } catch (e) {
      console.log(red(`an error occured inserting movie: ${e.toString()}`));
      console.error(movie);
      throw new Error('Unknown error occured');
    }
    console.log(green(`inserted new movie: ${movieTitle}`));
  };
}
// 329a7aa8
