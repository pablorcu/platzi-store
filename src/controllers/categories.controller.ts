import { Controller, Get, Param } from '@nestjs/common';

@Controller('categories')
export class CategoriesController {
  @Get(':id/products/:productoId')
  getCategory(
    @Param('productoId') productoId: string,
    @Param('id') id: string,
  ) {
    return `product ${productoId} and ${id}`;
  }
}
