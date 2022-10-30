
// src/entity/user.ts
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 255
  })
  type: string;

  @Column()
  status: number;

}