import { IsEmpty, IsNotEmpty, IsString } from 'class-validator';

export class CreateExpertDto {
  @IsNotEmpty()
  @IsString()
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  readonly password: string;

  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  readonly specialty: string;

  @IsEmpty()
  readonly info: string;
}
