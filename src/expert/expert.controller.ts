import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import {
  AcessTokenExpertGuard,
  AcessTokenUserGuard,
} from 'src/auth/guards/acess-token.guard';
import { CreateExpertDto } from './dtos/create-expert.dto';
import { Expert } from './entities/expert.entity';
import { ExpertService } from './expert.service';

@Controller('expert')
export class ExpertController {
  constructor(private readonly expertService: ExpertService) {}

  @Get('/')
  @UseGuards(AcessTokenExpertGuard)
  me(@CurrentUser() expert: Expert) {
    return {
      id: expert.id,
      email: expert.email,
      name: expert.name,
      specialty: expert.specialty,
    };
  }

  @Post('/register')
  async register(@Body() createExpertDto: CreateExpertDto) {
    return this.expertService.createUser(createExpertDto);
  }
}
