import { Category } from 'src/categories/entities/category.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', {
    nullable: false,
  })
  name: string;

  @Column('text', {
    nullable: true,
  })
  description: string;

  @Column('decimal', {
    nullable: false,
  })
  price: number;

  @ManyToOne(() => Category, (category) => category.products)
  category: Category;
}
