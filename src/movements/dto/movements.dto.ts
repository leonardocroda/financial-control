import { ApiProperty } from '@nestjs/swagger';
import { CategoryDto } from 'src/categories/dto/categories.dto';
import { UserDto } from 'src/users/dto/users.dto';

export class MovementsDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  type: 'revenue' | 'expense';

  @ApiProperty()
  finished: boolean;

  @ApiProperty()
  value: number;

  @ApiProperty()
  installments: number;

  @ApiProperty()
  isActive: boolean;

  @ApiProperty()
  categories: CategoryDto[];

  @ApiProperty()
  user?: UserDto;
}

export class CreateMovementsDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  type: 'revenue' | 'expense';

  @ApiProperty()
  finished: boolean;

  @ApiProperty()
  value: number;

  @ApiProperty()
  installments: number;

  @ApiProperty()
  isActive: boolean;

  @ApiProperty()
  categories: CategoryDto[];

  @ApiProperty()
  user?: UserDto;
}
