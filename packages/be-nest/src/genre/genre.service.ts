import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Genre } from './genre.entity';

@Injectable()
export class GenresService {
  constructor(
    @InjectRepository(Genre)
    private genresRepository: Repository<Genre>,
  ) {}

  findAll(): Promise<Genre[]> {
    return this.genresRepository.find();
  }

  findOne(genre: string): Promise<Genre | null> {
    return this.genresRepository.findOneBy({ name: genre });
  }

  getOrCreateGenre = async (genre: string): Promise<Genre> => {
    const existingGenre = await this.findOne(genre);
    if (existingGenre) {
      return existingGenre;
    }
    const createdGenre = await this.genresRepository.save(
      this.genresRepository.create({
        name: genre,
      }),
    );
    return createdGenre;
  };

  async remove(id: number): Promise<void> {
    await this.genresRepository.delete(id);
  }
}
