import { Module } from '@nestjs/common';
import { GenresModule } from './genre.module';
import { GenresService } from './genre.service';
import { GenresController } from './genre.controller';

@Module({
  imports: [GenresModule],
  providers: [GenresService],
  controllers: [GenresController],
})
export class GenreHttpModule {}
