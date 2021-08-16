import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Category } from './categories.entity';
import { CategoriesService } from './categories.service';
import { CategoryDto, CreateCategoryDto } from './dto/categories.dto';

@Controller('categories')
@ApiBearerAuth()
@ApiTags('Categories')
@UseGuards(JwtAuthGuard)
export class CategoriesController {
  constructor(private readonly service: CategoriesService) {}

  @ApiOperation({ summary: 'Find all Categories' })
  @Get()
  async getAll(@Headers('Authorization') auth: string): Promise<CategoryDto[]> {
    return this.service.getAll(auth);
  }

  @ApiOperation({ summary: 'Find one category' })
  @Get(':id')
  async getOne(
    @Headers('Authorization') auth: string,
    @Param('id') id: number,
  ): Promise<CategoryDto> {
    return this.service.getOne(id, auth);
  }

  @ApiOperation({ summary: 'Create category' })
  @Post()
  async create(
    @Headers('Authorization') auth: string,
    @Body() category: CreateCategoryDto,
  ): Promise<CategoryDto> {
    return this.service.create(category, auth);
  }

  @ApiOperation({ summary: 'Update category' })
  @Put(':id')
  async update(
    @Headers('Authorization') auth: string,
    @Body() category: CategoryDto,
    @Param('id') id: number,
  ): Promise<any> {
    return this.service.update(id, category, auth);
  }

  @ApiOperation({ summary: 'Delete category' })
  @Delete(':id')
  async delete(
    @Headers('Authorization') auth: string,
    @Param('id') id: number,
  ): Promise<any> {
    return this.service.delete(id, auth);
  }
}
