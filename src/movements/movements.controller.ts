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
import { CreateMovementsDto, MovementsDto } from './dto/movements.dto';
import { MovementsService } from './movements.service';

@Controller('movements')
@ApiBearerAuth()
@ApiTags('Movements')
@UseGuards(JwtAuthGuard)
export class MovementsController {
  constructor(private readonly service: MovementsService) {}

  @ApiOperation({ summary: 'Find all Categories' })
  @Get()
  async getAll(
    @Headers('Authorization') auth: string,
  ): Promise<MovementsDto[]> {
    return this.service.getAll(auth);
  }

  @ApiOperation({ summary: 'Find one movement' })
  @Get(':id')
  async getOne(
    @Headers('Authorization') auth: string,
    @Param('id') id: number,
  ): Promise<MovementsDto> {
    return this.service.getOne(id, auth);
  }

  @ApiOperation({ summary: 'Create movement' })
  @Post()
  async create(
    @Headers('Authorization') auth: string,
    @Body() movement: CreateMovementsDto,
  ): Promise<MovementsDto> {
    return this.service.create(movement, auth);
  }

  @ApiOperation({ summary: 'Update movement' })
  @Put(':id')
  async update(
    @Headers('Authorization') auth: string,
    @Body() movement: MovementsDto,
    @Param('id') id: number,
  ): Promise<any> {
    return this.service.update(id, movement, auth);
  }

  @ApiOperation({ summary: 'Delete movement' })
  @Delete(':id')
  async delete(
    @Headers('Authorization') auth: string,
    @Param('id') id: number,
  ): Promise<any> {
    return this.service.delete(id, auth);
  }
}
