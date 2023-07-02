import { Column, CreateDateColumn, Generated, UpdateDateColumn } from 'typeorm';

export class BaseCreateable {
  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column()
  @Generated('uuid')
  uuid: string;
}
