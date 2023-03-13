import { ApiProperty } from '@nestjs/swagger';
import { Category } from 'src/categories/entities/category.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('products')
export class Product {
  @ApiProperty({ description: 'Unique identifier', uniqueItems: true })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'Product name', uniqueItems: true })
  @Column('text', {
    nullable: false,
  })
  name: string;

  @ApiProperty({ description: 'Product description' })
  @Column('text', {
    nullable: true,
  })
  description: string;

  @ApiProperty({ description: 'Product price' })
  @Column('decimal', {
    nullable: false,
  })
  price: number;

  @ApiProperty({ description: 'Category Entity' })
  @ManyToOne(() => Category, (category) => category.products)
  category: Category;
}
