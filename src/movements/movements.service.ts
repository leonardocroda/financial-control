import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/users.entity';
import { UsersService } from 'src/users/users.service';
import { DeepPartial, Repository } from 'typeorm';
import { Movements } from './movements.entity';

@Injectable()
export class MovementsService {
  constructor(
    @InjectRepository(Movements)
    private readonly repository: Repository<Movements>,
    private readonly usersService: UsersService,
  ) {}

  async getAll(auth: string): Promise<Movements[]> {
    const user = this.usersService.getByToken(auth);
    return this.repository.find({ where: { user } });
  }

  async getOne(id: number, auth: string): Promise<Movements> {
    const user = this.usersService.getByToken(auth);
    return this.repository.findOne(id, { where: { user } });
  }

  async create(
    movement: DeepPartial<Movements>,
    auth: string,
  ): Promise<Movements> {
    const user: User = await this.usersService.getByToken(auth);

    return this.repository.save({ ...movement, user });
  }

  async update(id: number, movement: DeepPartial<Movements>, auth: string) {
    const movementToUpdate: Movements = await this.getOne(id, auth);

    if (movementToUpdate) {
      return this.repository.update(id, movement);
    } else {
      throw new NotFoundException('Movement to update not Found');
    }
  }

  async delete(id: number, auth: string) {
    const movementsToDelete: Movements = await this.getOne(id, auth);

    if (movementsToDelete) {
      return this.repository.delete(id);
    } else {
      throw new NotFoundException('Movement to delete not Found');
    }
  }
}
