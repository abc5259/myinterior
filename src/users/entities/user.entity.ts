import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Column, Entity } from 'typeorm';

export class SkillName {
  name?: string;
}

@Entity('User')
export class User extends CoreEntity {
  @IsEmail({ message: '이메일 형식이 아닙니다.' })
  @IsNotEmpty({ message: '이메일은 비어있을 수 없습니다.' })
  @Column({ unique: true })
  email: string;

  @IsString()
  @IsNotEmpty()
  @Column()
  password: string;

  @IsString({ message: '이름은 문자열이어야 합니다.' })
  @IsNotEmpty({ message: '이름은 비어있을 수 없습니다.' })
  @Column()
  nickname: string;
}
