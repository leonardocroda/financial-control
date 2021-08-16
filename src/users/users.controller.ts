import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UserDto } from './dto/users.dto';
import { User } from './users.entity';
import { UsersService } from './users.service';

@Controller('users')
@ApiBearerAuth()
@ApiTags('User')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @ApiOperation({ summary: 'Find all Users' })
  @Get()
  async getAll(): Promise<User[]> {
    return this.userService.getAll();
  }

  @ApiOperation({ summary: 'Find one User' })
  @Get('/:id')
  async getOne(@Param('id') id: number): Promise<User> {
    return this.userService.getOne(id);
  }

  @ApiOperation({ summary: 'Create new User' })
  @Post()
  async createUser(@Body() user: UserDto): Promise<User> {
    return this.userService.create(user);
  }

  @ApiOperation({ summary: 'Update an User' })
  @Put('/:id')
  async updateUser(@Body() user: UserDto, @Param('id') id: number) {
    this.userService.update(user, id);
  }
}
