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
  import { ApiTags, ApiOperation } from '@nestjs/swagger';

  import { ParseIntPipe } from './../../common/parse-int.pipe';
  
  import { CreateBrandDto, UpdateBrandDto } from '../dtos/brands.dtos';
  import { BrandsService } from '../services/brands.service';
  
  @ApiTags('brans')
  @Controller('brands')
  export class BrandsController {
    constructor(private recordService: BrandsService) {}
  
    @Get()
    @ApiOperation({ summary: 'List of brands' })
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
    @ApiOperation({ summary: 'List a brand' })
    getRecord(@Param('id', ParseIntPipe) id: number) {
      return this.recordService.findOne(id);
    }
  
    @Post()
    @ApiOperation({ summary: 'Create a brand' })
    create(@Body() payload: CreateBrandDto) {
      return this.recordService.create(payload);
    }
  
    @Put(':id')
    @ApiOperation({ summary: 'Update a brand' })
    update(
      @Param('id', ParseIntPipe) id: number,
      @Body() payload: UpdateBrandDto,
    ) {
      return this.recordService.update(id, payload);
    }
  
    @Delete(':id')
    @ApiOperation({ summary: 'Delete a brand' })
    delete(@Param('id', ParseIntPipe) id: number) {
      return this.recordService.remove(id);
    }
  }
  