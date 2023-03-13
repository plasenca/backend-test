import { ApiProperty } from '@nestjs/swagger';
import { Product } from 'src/products/entities/product.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('categories')
export class Category {
  @ApiProperty({ description: 'Unique identifier', uniqueItems: true })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'Category name', uniqueItems: true })
  @Column('text', {
    nullable: false,
    unique: true,
  })
  name: string;

  @ApiProperty({ description: 'Date of creation' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ description: 'Date of last update' })
  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Product, (product) => product.category)
  products: Product[];
}
