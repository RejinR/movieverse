import { Movie } from '@entity/movie.entity';
import {
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MoviesService } from '@services/movies.service';

@Controller('movies')
export class MoviesController {
  constructor(private readonly movieService: MoviesService) {}

  @Get()
  async getMovies(): Promise<Movie[]> {
    const movies = await this.movieService.findAll();
    return movies;
  }

  @Get(':id')
  async getMovie(@Param() params: any): Promise<Movie> {
    console.log('asd', params.id);
    const movies = await this.movieService.findOne(params.id);
    const genres = await movies.genres;
    return movies;
  }

  @Post('/seed-movies')
  @UseInterceptors(FileInterceptor('file'))
  async uploadMovies(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<{ success: boolean }> {
    await this.movieService.seedDatabase(file);
    return { success: true };
  }
}
