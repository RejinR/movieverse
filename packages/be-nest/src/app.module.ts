import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Movie } from './movies/movie.entity';
import { MoviesModule } from './movies/movies.module';
import { MovieHttpModule } from './movies/movies-http.module';
import { GenreHttpModule } from './genre/genre-http.module';
import { PersonHttpModule } from './person/person-http.module';
import { Genre } from './genre/genre.entity';
import { Person } from './person/person.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'rejin',
      password: 'p@ssw0rd',
      database: 'movies',
      entities: [Movie, Genre, Person],
      synchronize: true,
    }),
    GenreHttpModule,
    PersonHttpModule,
    MovieHttpModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
