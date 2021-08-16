import { Category } from 'src/categories/categories.entity';
import { User } from 'src/users/users.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Movements {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  type: 'revenue' | 'expense';

  @Column({ default: false })
  finished: boolean;

  @Column()
  value: number;

  @Column()
  installments: number;

  @Column({ default: true })
  isActive: boolean;

  @ManyToMany(() => Category, (categories) => categories.movements)
  @JoinTable()
  categories: Category[];

  @ManyToOne(() => User, (user) => user.movements)
  user: User;
}
