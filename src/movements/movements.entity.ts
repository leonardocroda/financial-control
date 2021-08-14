import { Categories } from 'src/categories/categories.entity';
import { User } from 'src/user/user.entity';
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

  @ManyToMany(() => Categories, (categories) => categories.movements)
  @JoinTable()
  categories: Categories[];

  @ManyToOne(() => User, (user) => user.movements)
  user: User;
}
