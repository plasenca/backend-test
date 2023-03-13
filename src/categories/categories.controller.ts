import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Category } from './entities/category.entity';

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  //* Populate categories

  @ApiResponse({ status: 201, description: 'Categories populated' })
  @ApiResponse({ status: 404, description: 'Category already exists' })
  @Post('populate')
  async populateCategories() {
    return await this.categoriesService.populateCategories();
  }

  //* CRUD operations

  @ApiResponse({
    status: 201,
    description: 'Category created',
    type: Category,
    schema: {
      description: 'Category created',
      example: {
        name: 'Category Name',
      },
    },
  })
  @ApiResponse({ status: 404, description: 'Category already exists' })
  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    return await this.categoriesService.create(createCategoryDto);
  }

  @ApiResponse({
    status: 200,
    description: 'Categories Returned',
    type: Category,
    isArray: true,
  })
  @Get()
  async findAll() {
    return await this.categoriesService.findAll();
  }

  @ApiResponse({
    status: 200,
    description: 'Category Found',
    type: Category,
    isArray: false,
  })
  @ApiResponse({ status: 404, description: 'Category Not Found' })
  @Get(':term')
  async findOne(@Param('term') term: string) {
    return await this.categoriesService.findOne(term);
  }
}
