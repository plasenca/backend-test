import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { validate as isUUID } from 'uuid';

import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
//? Data to populate
import * as categories from './data/categories.json';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const { name } = createCategoryDto;

    //* Check if category exists
    const categoryExists = await this.categoryRepository.findOne({
      where: {
        name,
      },
    });

    if (categoryExists) {
      throw new NotFoundException('Category already exists');
    }

    const category = this.categoryRepository.create({
      name,
    });

    return await this.categoryRepository.save(category);
  }

  async findAll() {
    return await this.categoryRepository.find();
  }

  async findOne(term: string) {
    let category: Category;

    if (isUUID(term)) {
      category = await this.categoryRepository.findOneBy({ id: term });

      if (!category) {
        throw new NotFoundException(`Category with id: ${term} not found`);
      }

      return category;
    }

    const queryBuilder = this.categoryRepository.createQueryBuilder('category');
    category = await queryBuilder
      .where('LOWER(name) =:name', { name: term.toLowerCase() })
      .getOne();

    if (!category) {
      throw new NotFoundException(`Category with name: '${term}' not found`);
    }

    return category;
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    const { name } = updateCategoryDto;

    //* Check if category exists
    await this.findOne(id);

    this.categoryRepository.update({ id }, { name });
  }

  async remove(id: string) {
    //* Check if category exists
    await this.findOne(id);

    return await this.categoryRepository.delete({ id });
  }

  async populateCategories() {
    // * Create categories array
    const categoriesJson: Array<CreateCategoryDto> = JSON.parse(
      JSON.stringify(categories),
    );

    try {
      // * Create categories
      for (const category of categoriesJson) {
        await this.create(category);
      }
    } catch (error: Error | any) {
      return {
        ok: false,
        message: error.message,
      };
    }

    return {
      ok: true,
      message: 'Categories populated',
    };
  }
}
