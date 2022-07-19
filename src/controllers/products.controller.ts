import { Controller, Get, Param, Query } from '@nestjs/common';

@Controller('products')
export class ProductsController {
  @Get()
  getProducts(
    @Query('limit') limit: number = 100,
    @Query('offset') offset: number = 0,
    @Query('brand') brand: string,
  ) {
    // const {limit, offset } = params
    return `productos: limit=> ${limit} offset=> ${offset} , brand = ${brand}`;
  }

  @Get('filter')
  getProductFilter() {
    return `Yo soy un filter`;
  }

  @Get(':productId')
  getProduct(@Param('productId') productId: string) {
    return `Product ${productId}`;
  }
}
