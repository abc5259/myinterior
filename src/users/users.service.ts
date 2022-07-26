import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersRepository } from './repositories/users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async createUser(createUserDto: CreateUserDto) {
    const user = await this.usersRepository.findByEmail(createUserDto.email);
    if (user) {
      throw new NotFoundException('이미 존재하는 사용자입니다.');
    }
    await this.usersRepository.save(this.usersRepository.create(createUserDto));
    return true;
  }
}
