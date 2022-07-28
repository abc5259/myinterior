import { IsEmpty, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class CreateExpertDto extends CreateUserDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  readonly specialty: string;

  @IsOptional()
  @IsString()
  readonly info?: string;
}
