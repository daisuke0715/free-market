import { IsNotEmpty, IsString } from 'class-validator';
import { UserStatus } from '../user-status.enum';

export class UpdateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  status: UserStatus;
}
