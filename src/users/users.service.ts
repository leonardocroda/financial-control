import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/auth.service';
import { DeepPartial, Repository } from 'typeorm';
import { User } from './users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private repository: Repository<User>,
    @Inject(forwardRef(() => AuthService))
    private authService: AuthService,
  ) {}

  async getAll(): Promise<User[]> {
    const users = await this.repository.find();
    return users;
  }

  async getByEmail(email: string): Promise<User> {
    return this.repository.findOne({ where: { email } });
  }

  async getByToken(token: string): Promise<User> {
    const userInformations: any = await this.authService.decode(token);
    const user = await this.getByEmail(userInformations.email);
    return user;
  }

  async getOne(id: number): Promise<User> {
    const user = await this.repository.findOne(id);
    return user;
  }

  async create(entity: DeepPartial<User>): Promise<User> {
    const user = await this.repository.save(entity);
    return user;
  }

  async update(entity: DeepPartial<User>, id: number) {
    await this.repository.update(id, entity);
  }
}
