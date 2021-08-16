import { Category } from 'src/categories/categories.entity';
import { Movements } from 'src/movements/movements.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => Category, (categories) => categories.user)
  categories: Category[];

  @OneToMany(() => Movements, (movements) => movements.user)
  movements: Movements[];
}
