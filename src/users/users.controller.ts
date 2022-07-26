import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AcessTokenGuard } from 'src/auth/guards/acess-token.guard';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { User } from './entities/user.entity';

import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/')
  @UseGuards(AcessTokenGuard)
  me(@CurrentUser() user: User) {
    return { id: user.id, email: user.email, nickname: user.nickname };
  }

  @Post('/register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }
}
