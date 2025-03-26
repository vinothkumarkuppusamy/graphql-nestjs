import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { User } from 'src/entities/user.entity';
import { UserService } from './user.service';
import { Logger } from '@nestjs/common';
import { createUserInput } from './dto/create-user.input';

@Resolver(() => User) // which entity u need to create resolver
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  private readonly logger = new Logger(UserResolver.name);
  @Query(() => [User], { name: 'users' }) // return shape or type of query
  async findAll() {
    return await this.userService.findAll();
  }

  @Query(() => User, { name: 'getUserById' })
  async findOne(@Args('id', { type: () => Int }) id: number) {
    return await this.userService.findOne(id);
  }
  @ResolveField('profile') // If query contains profile the query returns that function.
  async profile(@Parent() user: User) {
    this.logger.debug(`Fetching profile for user ${user.id}`);
    return await user.profile;
  }

  @Mutation(() => User)
  async createUser(@Args('createUserInput') createUserInput: createUserInput) {
    return await this.userService.create(createUserInput);
  }

  @Mutation(() => User)
  async updateUser(
    @Args('id', { type: () => Int }) id: number,
    @Args('updateUserInput') updateUserInput: createUserInput,
  ) {
    return await this.userService.update(id, updateUserInput);
  }

  @Mutation(() => Boolean)
  async removeUser(@Args('id', { type: () => Int }) id: number) {
    return await this.userService.remove(id);
  }
}
