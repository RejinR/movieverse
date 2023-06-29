import { BaseCreateable } from 'src/base_entity/base-creatable';
import { Genre } from 'src/genre/genre.entity';
import { Person } from 'src/person/person.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum Certificate {
  A = 'A',
  UA = 'UA',
  U = 'U',
  PG_13 = 'PG-13',
  R = 'R',
  G = 'G',
  TV_14 = 'TV-14',
  PASSED = 'PASSED',
  PG = 'PG',
  GP = 'GP',
  TV_PG = 'TV-PG',
  MA_16 = '16',
}

@Entity({ name: 'movies' })
export class Movie extends BaseCreateable {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  title: string;

  @Column({ name: 'release_year' })
  releaseYear: number;

  @Column()
  duration: number; // in minutes

  @Column()
  rating: number; // in minutes

  @Column({ name: 'number_of_votes' })
  numberOfVotes: number;

  @Column()
  gross: number;

  @Column({ length: 512 })
  overview: string;

  @Column()
  link: string;

  @Column({
    type: 'enum',
    enum: Certificate,
    nullable: true,
    default: Certificate.UA,
  })
  certificate: string;

  @ManyToMany(() => Genre)
  @JoinTable({
    name: 'movie_genre',
    joinColumn: {
      name: 'movie',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'genre',
      referencedColumnName: 'id',
    },
  })
  genres: Genre[];

  @ManyToMany(() => Person)
  @JoinTable({ name: 'movie_star' })
  stars: Person[];

  @ManyToOne(() => Person)
  @JoinColumn({
    name: 'director_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'fk_director_id',
  })
  director: Person;
}
