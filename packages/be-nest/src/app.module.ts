import { Genre } from '@entity/genre.entity';
import { Movie } from '@entity/movie.entity';
import { Person } from '@entity/person.entity';
import { GenreHttpModule } from '@modules/genre.module';
import { MovieHttpModule } from '@modules/movies.module';
import { PersonHttpModule } from '@modules/person.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

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
