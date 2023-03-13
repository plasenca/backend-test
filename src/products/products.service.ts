import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Product } from './entities/product.entity';
import { CreateProductDto, QueryCategoryDto } from './dto';
import { CategoriesService } from 'src/categories/categories.service';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,

    private readonly categoriesService: CategoriesService,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const { name, categoryId, ...rest } = createProductDto;

    //* Check if category exists
    await this.categoriesService.findOne(categoryId);

    //* Check if product exists
    const productExists = await this.productRepository.findOne({
      where: { name },
    });

    if (productExists) {
      throw new NotFoundException('Product already exists');
    }

    //* Create product

    const product = this.productRepository.create({
      name,
      category: { id: categoryId },
      ...rest,
    });

    return await this.productRepository.save(product);
  }

  async find(queryCategoryDto: QueryCategoryDto) {
    const { name } = queryCategoryDto;

    //* Check if category exists
    if (!name) {
      return await this.productRepository.find({ relations: ['category'] });
    }

    const { id: categoryId } = await this.categoriesService.findOne(name);

    return await this.productRepository.find({
      where: { category: { id: categoryId } },
      relations: ['category'],
    });
  }

  async findOne(id: string) {
    const product = await this.productRepository.findOne({ where: { id } });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return product;
  }
}
