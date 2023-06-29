import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Person } from './person.entity';

@Injectable()
export class PersonService {
  constructor(
    @InjectRepository(Person)
    private personRepository: Repository<Person>,
  ) {}

  findAll(): Promise<Person[]> {
    return this.personRepository.find();
  }

  findOne(id: number): Promise<Person | null> {
    return this.personRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.personRepository.delete(id);
  }
}
