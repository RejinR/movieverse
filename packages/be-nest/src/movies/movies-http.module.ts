import { Module } from '@nestjs/common';
import { MoviesModule } from './movies.module';
import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';

@Module({
  imports: [MoviesModule],
  providers: [MoviesService],
  controllers: [MoviesController],
})
export class MovieHttpModule {}
