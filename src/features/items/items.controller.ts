import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  ParseUUIDPipe,
  UseGuards,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { ItemsService } from './items.service';
import { Item } from '../../entities/item.entity';
import { CreateItemDto } from './dto/create-item.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { GetUser } from '../auth/decorator/get-user.decorator';
import { User } from '../../entities/user.entity';
import { UserStatus } from '../auth/user-status.enum';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Role } from '../auth/decorator/role.decorator';

@Controller('items')
@UseInterceptors(ClassSerializerInterceptor)
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Get()
  async findAll(): Promise<Item[]> {
    return await this.itemsService.findAll();
  }

  @Get(':id')
  async findById(@Param('id', ParseUUIDPipe) id: string): Promise<Item> {
    return await this.itemsService.findById(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Role(UserStatus.PREMIUM)
  async create(
    @Body() createItemDto: CreateItemDto,
    @GetUser() user: User,
  ): Promise<Item> {
    console.log(user);
    return await this.itemsService.create(createItemDto, user);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async updateStatus(
    @Param('id', ParseUUIDPipe) id: string,
    @GetUser() user: User,
  ): Promise<Item> {
    return await this.itemsService.updateStatus(id, user);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async delete(
    @Param('id', ParseUUIDPipe) id: string,
    @GetUser() user: User,
  ): Promise<void> {
    await this.itemsService.delete(id, user);
  }
}
