import { EntityRepository, Repository } from 'typeorm';
import { Expert } from '../entities/expert.entity';

@EntityRepository(Expert)
export class ExpertsRepository extends Repository<Expert> {
  findByEmail(email: string) {
    return this.findOne({ email });
  }
}
