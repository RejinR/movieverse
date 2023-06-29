import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from './movie.entity';
import { Genre } from 'src/genre/genre.entity';
import { Person } from 'src/person/person.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Movie, Genre, Person])],
  exports: [TypeOrmModule],
})
export class MoviesModule {}
