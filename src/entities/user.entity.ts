import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Profile } from './profile.entity';
import { Post } from './post.entity';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Role } from 'src/enums/roles.enum';

@ObjectType() // graphQL always returns objectType
@Entity('user')
export class User {
  constructor(partial: Partial<User>) {
    // Partial<User> makes all properties of User optional.
    Object.assign(this, partial);
    // This means you can pass an object containing some or all properties of User, and it will still work.
  }

  @Field(() => Int) // graphql only have a integer datatype
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  username: string;

  @Field()
  @Column()
  email: string;

  @Field(() => Role)
  @Column({
    type: 'enum',
    enum: Role,
    default: Role.USER,
  })
  role: Role;

  @Field(() => [Post]) // specify the list of datatype
  @OneToMany(() => Post, (post) => post.user)
  posts: Promise<Post[]>;

  @Field(() => Profile)
  @OneToOne(() => Profile, (profile) => profile.user, { cascade: true })
  @JoinColumn()
  profile: Promise<Profile>; // leveraging the lazy loading feature of typeORM
}
