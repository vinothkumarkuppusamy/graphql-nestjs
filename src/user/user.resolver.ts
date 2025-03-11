import { Query, Resolver } from '@nestjs/graphql';
import { User } from 'src/entities/user.entity';

@Resolver(() => User) // which entity u need to create resolver
export class UserResolver {
  @Query(() => [User], { name: 'users' }) // return shape or type of query
  async findAll() {
    return [] as User[];
  }
}
