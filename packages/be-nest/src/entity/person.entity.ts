import { BaseCreateable } from '@entity/base-creatable';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Person extends BaseCreateable {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
