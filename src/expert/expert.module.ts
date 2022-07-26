import { Module } from '@nestjs/common';
import { ExpertService } from './expert.service';
import { ExpertController } from './expert.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExpertsRepository } from './repositories/expert.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ExpertsRepository])],
  providers: [ExpertService],
  controllers: [ExpertController],
})
export class ExpertModule {}
