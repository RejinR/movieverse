import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Movie } from './movies/movie.entity';
import { MoviesModule } from './movies/movies.module';
import { MovieHttpModule } from './movies/movies-http.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'rejin',
      password: 'p@ssw0rd',
      database: 'movies',
      entities: [Movie],
      synchronize: true,
    }),
    MovieHttpModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
