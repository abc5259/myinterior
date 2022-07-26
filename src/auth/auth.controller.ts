import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dtos/login-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async login(@Body() { isExpert, ...loginUserDto }: LoginUserDto) {
    if (isExpert) return this.authService.expertLogin(loginUserDto);
    else return this.authService.userLogin(loginUserDto);
  }
}
