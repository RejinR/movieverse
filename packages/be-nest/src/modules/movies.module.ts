import { MoviesController } from '@controller/movies.controller';
import { Genre } from '@entity/genre.entity';
import { Movie } from '@entity/movie.entity';
import { Person } from '@entity/person.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GenresService } from '@services/genre.service';
import { MoviesService } from '@services/movies.service';
import { PersonService } from '@services/person.service';

@Module({
  imports: [TypeOrmModule.forFeature([Movie, Genre, Person])],
  providers: [MoviesService, GenresService, PersonService],
  controllers: [MoviesController],
  exports: [TypeOrmModule],
})
export class MovieHttpModule {}
