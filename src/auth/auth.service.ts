import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ExpertsRepository } from 'src/expert/repositories/expert.repository';
import { UsersRepository } from 'src/users/repositories/users.repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly expertsRepository: ExpertsRepository,
    private readonly jwtService: JwtService,
  ) {}

  async userLogin({ email, password }: { email: string; password: string }) {
    const user = await this.usersRepository.findByEmail(email);
    if (!user) {
      throw new NotFoundException('존재하지 않는 사용자입니다.');
    }
    const match = await user.checkPassword(password);
    if (!match) {
      throw new UnauthorizedException('비밀번호가 틀립니다.');
    }
    const accessToken = this.createToken(email, false);
    return { accessToken };
  }

  async expertLogin({ email, password }: { email: string; password: string }) {
    const expert = await this.expertsRepository.findByEmail(email);
    if (!expert) {
      throw new NotFoundException('존재하지 않는 사용자입니다.');
    }
    const match = await expert.checkPassword(password);
    if (!match) {
      throw new UnauthorizedException('비밀번호가 틀립니다.');
    }
    const accessToken = this.createToken(email, true);
    return { accessToken };
  }

  createToken(email: string, isExpert: boolean) {
    return this.jwtService.sign({ email, isExpert });
  }
}
