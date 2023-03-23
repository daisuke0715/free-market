import { User } from 'src/entities/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { CredentialsDto } from '../dto/credentials.dto';

export interface IUserService {
  signup(param: CreateUserDto): Promise<User>;
  signin(param: CredentialsDto): Promise<{ accessToken: string }>;
  getUsers(): Promise<User[]>;
  getUser(id: string): Promise<User>;
  update(id: string, param: UpdateUserDto): Promise<User>;
  delete(id: string): Promise<void>;
}
