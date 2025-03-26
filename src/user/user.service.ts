import { Injectable, NotFoundException   } from '@nestjs/common';
import { updateUserInput } from './dto/update-user.input';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { createUserInput } from './dto/create-user.input';
import { handleResponse } from 'src/helper/response.helper';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}

  findAll() {
    return this.userRepo.find();
  }

  findOne(id: number) {
    return this.userRepo.findOneByOrFail({ id });
  }

  async update(id: number, updateUserInput: updateUserInput) {
    const findUser = await this.userRepo.findOneByOrFail({ id });
    return await this.userRepo.save(
      new User(Object.assign(findUser, updateUserInput)),
    );
  }
  async create(createUserInput: createUserInput) {
    try {
      const newUser = this.userRepo.create(createUserInput);
      return this.userRepo.save(newUser);
    } catch (error) {
      console.log(error);
      return handleResponse(false, error.message);
    }
  }
  async remove(id: number) {
    const response = await this.userRepo.delete(id);
    return response.affected === 1;
  }
}
