import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExpertsRepository } from 'src/expert/repositories/expert.repository';
import { UsersRepository } from 'src/users/repositories/users.repository';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ExpertJwtStrategy } from './strategy/jwt-access-expert.strategy';
import { UserJwtStrategy } from './strategy/jwt-access-user.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: `${60 * 60}s` },
      }),
    }),
    TypeOrmModule.forFeature([UsersRepository, ExpertsRepository]),
  ],
  controllers: [AuthController],
  providers: [AuthService, UserJwtStrategy, ExpertJwtStrategy],
  exports: [UserJwtStrategy, ExpertJwtStrategy],
})
export class AuthModule {}
