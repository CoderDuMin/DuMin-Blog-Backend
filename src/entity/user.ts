
// src/entity/user.ts
import { Entity, Column, PrimaryGeneratedColumn,OneToMany} from 'typeorm';
import { Article } from './article'
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 255
  })
  nickname: string;

  @Column()
  account: string;

  @Column({select:false})
  password: string;

  @Column()
  status: number;

  @Column()
  gender: number;

  @OneToMany(type => Article, article => article.title )
  article:Article
}