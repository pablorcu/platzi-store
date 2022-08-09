import {
  Controller,
  Get,
  Param,
  Query,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { ParseIntPipe } from '../../common/parse-int.pipe';

import { CreateUserDto, UpdateUserDto } from '../dtos/users.dtos';
import { UsersService } from '../services/users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private recordService: UsersService) {}

  @Get()
  getRecords(
    @Query('limit') limit: number = 100,
    @Query('offset') offset: number = 0,
    @Query('brand') brand: string,
  ) {
    // const {limit, offset } = params
    // return {
    //   message: `productos: limit=> ${limit} offset=> ${offset} , brand = ${brand}`,
    // };
    return this.recordService.findAll();
  }

  @Get(':id/orders')
  getOrder(@Param('id', ParseIntPipe) id: number) {
    return this.recordService.getOrderbyUser(id);
  }

  @Get('tasks')
  getTask() {
    return this.recordService.getTasks();
  }

  @Get(':id')
  getRecord(@Param('id', ParseIntPipe) id: number) {
    return this.recordService.findOne(id);
  }

  @Post()
  create(@Body() payload: CreateUserDto) {
    return this.recordService.create(payload);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateUserDto,
  ) {
    return this.recordService.update(id, payload);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.recordService.remove(id);
  }
}
