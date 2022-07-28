import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { ExpertController, UsersController } from './users.controller';
import { UsersRepository } from './repositories/users.repository';
import { Expert } from './entities/expert.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UsersRepository, Expert])],
  providers: [UsersService],
  controllers: [UsersController, ExpertController],
})
export class UsersModule {}
