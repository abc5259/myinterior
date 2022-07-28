import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersRepository } from 'src/users/repositories/users.repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepository: UsersRepository,
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
    const accessToken = this.createToken(email);
    return { accessToken };
  }

  createToken(email: string) {
    return this.jwtService.sign({ email });
  }
}
