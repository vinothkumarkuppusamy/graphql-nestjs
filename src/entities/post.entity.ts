import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Tag } from './tag.entity';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity('post')
export class Post {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  title: string;

  @Field()
  @Column()
  content: string;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.posts)
  user: User;

  @Field(() => [Tag ])
  @ManyToMany(() => Tag, (tag) => tag.posts)
  @JoinTable()
  tags: Tag[];
}
