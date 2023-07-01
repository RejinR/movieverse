import { Certificate } from '@interfaces/movies.interface';
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

  @Column('decimal', { precision: 6, scale: 2 })
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

  @ManyToMany(() => Genre, { eager: true })
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

  @ManyToMany(() => Person, { eager: true })
  @JoinTable({ name: 'movie_star' })
  stars: Person[];

  @ManyToOne(() => Person, { eager: true })
  @JoinColumn({
    name: 'director_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'fk_director_id',
  })
  director: Person;
}
