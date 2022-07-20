import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersRepository } from 'src/users/repositories/users.repository';
import { CreateUserDto } from './dtos/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly jwtService: JwtService,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    const user = await this.usersRepository.findByEmail(createUserDto.email);
    if (user) {
      throw new NotFoundException('이미 존재하는 사용자입니다.');
    }
    await this.usersRepository.save(this.usersRepository.create(createUserDto));
    return true;
  }

  async login({ email, password }: { email: string; password: string }) {
    const user = await this.usersRepository.findByEmail(email);
    if (!user) {
      throw new NotFoundException('존재하지 않는 사용자입니다.');
    }
    const match = await user.checkPassword(password);
    if (!match) {
      throw new UnauthorizedException('비밀번호가 틀립니다.');
    }
    const accessToken = this.createToken(email);
    return { accessToken };
  }

  createToken(email: string) {
    return this.jwtService.sign({ email });
  }
}
