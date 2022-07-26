import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Expert } from 'src/expert/entities/expert.entity';
import { User } from 'src/users/entities/user.entity';
import { UsersRepository } from 'src/users/repositories/users.repository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt-access') {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly configService: ConfigService,
  ) {
    super({
      secretOrKey: configService.get<string>('JWT_SECRET'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }
  async validate({ email, isExpert }) {
    let user: User | Expert;
    if (!isExpert) user = await this.usersRepository.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
