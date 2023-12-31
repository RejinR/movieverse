import { Movie } from '@entity/movie.entity';
import { MovieDto } from '@interfaces/movies.interface';
import {
  Controller,
  Get,
  Param,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MoviesService } from '@services/movies.service';
import { transformMovieDtoFrom } from '@transformers/movies.transformer';

@Controller('movies')
export class MoviesController {
  constructor(private readonly movieService: MoviesService) {}

  @Get()
  async getMovies(
    @Query('page') page = 1,
    @Query('size') size = 10,
    @Query('search') search = '',
  ): Promise<Movie[]> {
    const movies = await this.movieService.findAll(page, size, search);
    return movies;
  }

  @Get('/find/:uuid')
  async getMovie(@Param() params: any): Promise<MovieDto> {
    const movies = await this.movieService.findOne(params.uuid);
    return await transformMovieDtoFrom(movies);
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
