import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { User } from './schemas/user.schema';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async getUserById(userId: string): Promise<User> {
    return this.usersRepository.findOne({ userId });
  }

  async getUserByEmail(email: string): Promise<User> {
    return this.usersRepository.findOne({ email });
  }

  async getUsers(): Promise<User[]> {
    return this.usersRepository.find({});
  }

  async createUser(user: CreateUserDto): Promise<User> {
    return this.usersRepository.create(user);
  }

  async updateUser(userId: string, userUpdates: UpdateUserDto): Promise<User> {
    return this.usersRepository.findOneAndUpdate({ _id: userId }, userUpdates);
  }
}
