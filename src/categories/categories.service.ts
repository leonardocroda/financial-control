import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/users.entity';
import { UsersService } from 'src/users/users.service';
import { DeepPartial, Repository } from 'typeorm';
import { Category } from './categories.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly repository: Repository<Category>,
    private readonly usersService: UsersService,
  ) {}

  async getAll(auth: string): Promise<Category[]> {
    const user = this.usersService.getByToken(auth);
    return this.repository.find({ where: { user } });
  }

  async getOne(id: number, auth: string): Promise<Category> {
    const user = this.usersService.getByToken(auth);
    return this.repository.findOne(id, { where: { user } });
  }

  async create(
    category: DeepPartial<Category>,
    auth: string,
  ): Promise<Category> {
    const user: User = await this.usersService.getByToken(auth);

    return this.repository.save({ ...category, user });
  }

  async update(id: number, category: DeepPartial<Category>, auth: string) {
    const categoryToUpdate: Category = await this.getOne(id, auth);

    if (categoryToUpdate) {
      return this.repository.update(id, category);
    } else {
      throw new NotFoundException('Category to update not Found');
    }
  }

  async delete(id: number, auth: string) {
    const categoryToDelete: Category = await this.getOne(id, auth);

    if (categoryToDelete) {
      return this.repository.delete(id);
    } else {
      throw new NotFoundException('Category to delete not Found');
    }
  }
}
