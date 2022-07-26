import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateExpertDto } from './dtos/create-expert.dto';
import { ExpertsRepository } from './repositories/expert.repository';

@Injectable()
export class ExpertService {
  constructor(private readonly expertsRepository: ExpertsRepository) {}

  async createUser(createExpertDto: CreateExpertDto) {
    const expert = await this.expertsRepository.findByEmail(
      createExpertDto.email,
    );
    if (expert) {
      throw new NotFoundException('이미 존재하는 사용자입니다.');
    }
    await this.expertsRepository.save(
      this.expertsRepository.create(createExpertDto),
    );
    return true;
  }
}
