import { Person } from '@entity/person.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PersonService {
  constructor(
    @InjectRepository(Person)
    private personRepository: Repository<Person>,
  ) {}

  findAll(): Promise<Person[]> {
    return this.personRepository.find();
  }

  findOne(name: string): Promise<Person | null> {
    return this.personRepository.findOneBy({ name });
  }

  async remove(id: number): Promise<void> {
    await this.personRepository.delete(id);
  }

  getOrCreatePerson = async (personName: string): Promise<Person> => {
    const existingPerson = await this.findOne(personName);
    if (existingPerson) {
      return existingPerson;
    }
    const createdPerson = await this.personRepository.save(
      this.personRepository.create({
        name: personName,
      }),
    );
    return createdPerson;
  };
}
