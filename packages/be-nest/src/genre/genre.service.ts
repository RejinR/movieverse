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

  findOne(id: number): Promise<Genre | null> {
    return this.genresRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.genresRepository.delete(id);
  }
}
