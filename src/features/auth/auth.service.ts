import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from '../../entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { IUserService } from './inteface/user-service';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { CredentialsDto } from './dto/credentials.dto';

@Injectable()
export class AuthService implements IUserService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async signup(createUserDto: CreateUserDto): Promise<User> {
    const { name, password, status } = createUserDto;
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    const user = this.usersRepository.create({
      name,
      password: hashPassword,
      status,
    });
    await this.usersRepository.save(user);
    return user;
  }

  async signin(
    credentialsDto: CredentialsDto,
  ): Promise<{ accessToken: string }> {
    const { name, password } = credentialsDto;
    const user = await this.usersRepository.findOne({ where: { name } });

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload = { id: user.id, name: user.name };
      const accessToken = await this.jwtService.sign(payload);
      // JWTの取得
      return { accessToken };
    }
    throw new UnauthorizedException(
      'ユーザー名またはパスワードを確認してください。',
    );
  }

  async getUsers(): Promise<User[]> {
    throw new Error('Method not implemented.');
  }

  async getUser(id: string): Promise<User> {
    throw new Error('Method not implemented.');
  }

  update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    throw new Error('Method not implemented.');
  }
  delete(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
