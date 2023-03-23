import { User } from 'src/entities/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

export interface IUserService {
  getUsers(): Promise<User[]>;
  getUser(id: string): Promise<User>;
  create(param: CreateUserDto): Promise<User>;
  update(id: string, param: UpdateUserDto): Promise<User>;
  delete(id: string): Promise<void>;
}
