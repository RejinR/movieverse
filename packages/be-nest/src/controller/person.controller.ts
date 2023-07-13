import { Person } from '@entity/person.entity';
import { Controller, Get } from '@nestjs/common';
import { PersonService } from '@services/person.service';

@Controller('person')
export class PersonController {
  constructor(private readonly personService: PersonService) {}

  @Get()
  async getAllPersons(): Promise<Person[]> {
    const persons = await this.personService.findAll();
    return persons;
  }
}
