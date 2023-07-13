import { PersonController } from '@controller/person.controller';
import { Person } from '@entity/person.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonService } from '@services/person.service';

@Module({
  imports: [TypeOrmModule.forFeature([Person])],
  providers: [PersonService],
  controllers: [PersonController],
  exports: [TypeOrmModule],
})
export class PersonHttpModule {}
