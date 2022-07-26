import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ExpertsRepository } from 'src/expert/repositories/expert.repository';

@Injectable()
export class ExpertJwtStrategy extends PassportStrategy(
  Strategy,
  'jwt-access-expert',
) {
  constructor(
    private readonly expertsRepository: ExpertsRepository,
    private readonly configService: ConfigService,
  ) {
    super({
      secretOrKey: configService.get<string>('JWT_SECRET'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }
  async validate({ email, isExpert }) {
    const user = await this.expertsRepository.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
