import { BaseCreateable } from 'src/base_entity/base-creatable';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Person extends BaseCreateable {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
