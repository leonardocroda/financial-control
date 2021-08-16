import { ApiProperty } from '@nestjs/swagger';
import { UserDto } from 'src/users/dto/users.dto';

export class CategoryDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  color: string;

  @ApiProperty()
  isActive: boolean;

  @ApiProperty()
  user?: UserDto;
}

export class CreateCategoryDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  color: string;

  @ApiProperty()
  isActive: boolean;

  @ApiProperty()
  user?: UserDto;
}
