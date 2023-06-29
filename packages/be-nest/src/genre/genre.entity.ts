import { BaseCreateable } from '../base_entity/base-creatable';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Genre extends BaseCreateable {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
