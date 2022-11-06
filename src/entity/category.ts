
// src/entity/user.ts
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: number;

  @Column()
  label: string;

  @Column()
  status: number;

}