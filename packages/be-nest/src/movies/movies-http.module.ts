import { Module } from '@nestjs/common';
import { MoviesModule } from './movies.module';
import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';
import { GenresService } from 'src/genre/genre.service';
import { PersonService } from 'src/person/person.service';

@Module({
  imports: [MoviesModule],
  providers: [MoviesService, GenresService, PersonService],
  controllers: [MoviesController],
})
export class MovieHttpModule {}
