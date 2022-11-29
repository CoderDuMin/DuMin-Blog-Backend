
// src/entity/user.ts
import { Entity, Column, PrimaryGeneratedColumn,ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user';

@Entity()
export class Article {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 255
  })
  title: string;

  @Column()
  content: string;

  @Column()
  type: number;

  @Column()
  status: number;

  @Column()
  isPublic: number;

  @Column()
  userId: number;

  @Column()
  createTime: Date;

  @Column()
  editTime: Date;

  @Column()
  favorCount: number;

  @Column()
  keywords: string;

  @ManyToOne(type => User)
  @JoinColumn({name:'userId'})
  user:User
}