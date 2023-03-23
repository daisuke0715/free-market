import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from 'src/entities/user.entity';
import { AuthService } from './auth.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { CredentialsDto } from './dto/credentials.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.authService.signup(createUserDto);
  }

  @Post('signin')
  async signin(
    @Body() credentialsDto: CredentialsDto,
  ): Promise<{ accessToken: string }> {
    return await this.authService.signin(credentialsDto);
  }

  @Get()
  getUsers() {
    throw new Error('Method not implemented.');
  }

  @Get(':id')
  getUser(@Param('id') id: string) {
    throw new Error('Method not implemented.');
  }

  @Patch(':id')
  update(@Body() updateUserDto: UpdateUserDto) {
    throw new Error('Method not implemented.');
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    throw new Error('Method not implemented.');
  }
}
