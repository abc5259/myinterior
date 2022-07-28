import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateExpertDto } from './dtos/create-expert.dto';
import { CreateUserDto } from './dtos/create-user.dto';
import { Expert } from './entities/expert.entity';
import { UserRole } from './entities/user.entity';
import { UsersRepository } from './repositories/users.repository';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    @InjectRepository(Expert)
    private readonly expert: Repository<Expert>,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    const user = await this.usersRepository.findByEmail(createUserDto.email);
    if (user) {
      throw new NotFoundException('이미 존재하는 사용자입니다.');
    }
    await this.usersRepository.save(
      this.usersRepository.create({ ...createUserDto, role: UserRole.User }),
    );
    return true;
  }

  async createExpert({
    email,
    password,
    nickname,
    name,
    specialty,
    info,
  }: CreateExpertDto) {
    const user = await this.usersRepository.findByEmail(email);
    if (user) {
      throw new NotFoundException('이미 존재하는 사용자입니다.');
    }

    const expert = await this.expert.save(
      this.expert.create({
        name,
        specialty,
        info,
      }),
    );

    await this.usersRepository.save(
      this.usersRepository.create({
        role: UserRole.Expert,
        email,
        password,
        nickname,
        expert,
      }),
    );
    return true;
  }
}
