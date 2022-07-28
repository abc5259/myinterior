import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AcessTokenGuard } from 'src/auth/guards/acess-token.guard';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { User } from './entities/user.entity';

import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { CreateExpertDto } from './dtos/create-expert.dto';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/')
  @UseGuards(AcessTokenGuard)
  me(@CurrentUser() user: User) {
    return {
      id: user.id,
      email: user.email,
      nickname: user.nickname,
      role: user.role,
    };
  }

  @Post('/register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }
}

@Controller('expert')
export class ExpertController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/register')
  async registerExpert(@Body() createExpertDto: CreateExpertDto) {
    return this.usersService.createExpert(createExpertDto);
  }
}
