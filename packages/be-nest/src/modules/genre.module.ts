import { GenresController } from '@controller/genre.controller';
import { Genre } from '@entity/genre.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GenresService } from '@services/genre.service';

@Module({
  imports: [TypeOrmModule.forFeature([Genre])],
  providers: [GenresService],
  controllers: [GenresController],
  exports: [TypeOrmModule],
})
export class GenreHttpModule {}
