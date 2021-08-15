import { Movements } from 'src/movements/movements.entity';
import { User } from 'src/users/users.entity';
import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Categories {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  color: string;

  @Column({ default: true })
  isActive: boolean;

  @ManyToMany(() => Movements, (movements) => movements.categories)
  movements: Movements[];

  @ManyToOne(() => User, (user) => user.categories)
  user: User;
}
