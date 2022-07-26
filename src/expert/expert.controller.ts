import { Body, Controller, Post } from '@nestjs/common';
import { CreateExpertDto } from './dtos/create-expert.dto';
import { ExpertService } from './expert.service';

@Controller('expert')
export class ExpertController {
  constructor(private readonly expertService: ExpertService) {}

  @Post('/register')
  async register(@Body() createExpertDto: CreateExpertDto) {
    return this.expertService.createUser(createExpertDto);
  }
}
