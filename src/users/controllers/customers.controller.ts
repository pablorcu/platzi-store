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

import { CreateCustomerDto, UpdateCustomerDto } from '../dtos/customers.dtos';
import { CustomersService } from '../services/customers.service';

@ApiTags('customers')
@Controller('customers')
export class CustomersController {
  constructor(private recordService: CustomersService) {}

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

  @Get(':id')
  getRecord(@Param('id', ParseIntPipe) id: number) {
    return this.recordService.findOne(id);
  }

  @Post()
  create(@Body() payload: CreateCustomerDto) {
    return this.recordService.create(payload);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateCustomerDto,
  ) {
    return this.recordService.update(id, payload);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.recordService.remove(id);
  }
}
