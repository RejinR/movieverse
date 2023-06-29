import { Controller, Get } from '@nestjs/common';
import { PersonService } from './person.service';
import { Person } from './person.entity';

@Controller('movies')
export class PersonController {
  constructor(private readonly personService: PersonService) {}

  @Get()
  async getHello(): Promise<Person[]> {
    const movies = await this.personService.findAll();
    return movies;
  }
}
