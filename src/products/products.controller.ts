import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseUUIDPipe,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';

import { ProductsService } from './products.service';
import { CreateProductDto, QueryCategoryDto } from './dto';
import { Product } from './entities/product.entity';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @ApiResponse({
    status: 201,
    description: 'Product created',
    type: CreateProductDto,
    schema: {
      description: 'Product created',
      example: {
        name: 'Product Name',
        description: 'Product Description',
        price: 100,
        categoryId: 'Category ID',
      },
    },
  })
  @ApiResponse({ status: 404, description: 'Product already exists' })
  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @ApiResponse({
    status: 200,
    description: 'Products Returned',
    type: Product,
    isArray: true,
  })
  @Get()
  findAll(@Query() queryCategoryDto: QueryCategoryDto) {
    return this.productsService.find(queryCategoryDto);
  }

  @ApiResponse({
    status: 200,
    description: 'Product Returned',
    type: Product,
  })
  @ApiResponse({ status: 404, description: 'Product not found' })
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.productsService.findOne(id);
  }
}
