import { Controller, Get } from '@nestjs/common';
import { GenresService } from './genre.service';
import { Genre } from './genre.entity';

@Controller('genres')
export class GenresController {
  constructor(private readonly genreService: GenresService) {}

  @Get()
  async getHello(): Promise<Genre[]> {
    const movies = await this.genreService.findAll();
    return movies;
  }
}
