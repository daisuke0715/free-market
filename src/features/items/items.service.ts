import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Item } from '../../entities/item.entity';
import { ItemStatus } from './item-status.enum';
import { CreateItemDto } from './dto/create-item.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../entities/user.entity';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item)
    private readonly itemsRepository: Repository<Item>,
  ) {}

  async findAll(): Promise<Item[]> {
    return await this.itemsRepository.find();
  }

  async findById(id: string): Promise<Item> {
    const found = await this.itemsRepository.findOne({ where: { id: id } });
    if (!found) {
      throw new NotFoundException();
    }
    return found;
  }

  async create(createItemDto: CreateItemDto, user: User): Promise<Item> {
    const item = {
      ...createItemDto,
      status: ItemStatus.ON_SALE,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      user,
    };
    return await this.itemsRepository.save(item);
  }

  async updateStatus(id: string, user: User): Promise<Item> {
    const item = await this.findById(id);
    if (item.userId === user.id) {
      throw new BadRequestException('自身の商品を購入することはできません。');
    }
    item.status = ItemStatus.SOLD_OUT;
    item.updatedAt = new Date().toISOString();
    return await this.itemsRepository.save(item);
  }

  async delete(id: string, user: User): Promise<void> {
    const item = await this.findById(id);
    if (item.userId !== user.id) {
      throw new BadRequestException('他人の商品を削除することはできません。');
    }
    await this.itemsRepository.delete(item);
  }
}
