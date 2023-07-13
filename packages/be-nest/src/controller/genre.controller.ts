import { Genre } from '@entity/genre.entity';
import { Controller, Get } from '@nestjs/common';
import { GenresService } from '@services/genre.service';

@Controller('genres')
export class GenresController {
  constructor(private readonly genreService: GenresService) {}

  @Get()
  async getAllGenres(): Promise<Genre[]> {
    const genres = await this.genreService.findAll();
    return genres;
  }
}
