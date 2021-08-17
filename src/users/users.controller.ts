import {
  Body,
  Controller,
  Get,
  Headers,
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
@ApiTags('User')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Find one User' })
  @Get('/:id')
  async getOne(
    @Param('id') id: number,
    @Headers('Authorization') auth: string,
  ): Promise<User> {
    return this.userService.getOne(id, auth);
  }

  @ApiOperation({ summary: 'Create new User' })
  @Post()
  async createUser(@Body() user: UserDto): Promise<User> {
    return this.userService.create(user);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Update an User' })
  @ApiBearerAuth()
  @Put('/:id')
  async updateUser(
    @Body() user: UserDto,
    @Headers('Authorization') auth: string,
    @Param('id') id: string,
  ) {
    return this.userService.update(user, parseInt(id), auth);
  }
}
