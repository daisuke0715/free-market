import { Injectable, NotFoundException } from '@nestjs/common';
import { Item } from '../../entities/item.entity';
import { ItemStatus } from './item-status.enum';
import { CreateItemDto } from './dto/create-item.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

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

  async create(createItemDto: CreateItemDto): Promise<void> {
    await this.itemsRepository.insert({
      ...createItemDto,
      status: ItemStatus.ON_SALE,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    return;
  }

  async updateStatus(id: string): Promise<Item> {
    const item = await this.findById(id);
    item.status = ItemStatus.SOLD_OUT;
    item.updatedAt = new Date().toISOString();
    return await this.itemsRepository.save(item);
  }

  async delete(id: string): Promise<void> {
    const item = await this.findById(id);
    await this.itemsRepository.delete(item);
  }
}
