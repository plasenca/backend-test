import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateProductDto {
  @ApiProperty({
    description: 'Product name',
    uniqueItems: true,
    example: 'Polo',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Product description',
    example: 'Polo de algodon',
  })
  @IsString()
  @IsOptional()
  description: string;

  @ApiProperty({
    description: 'Product price',
    example: 100,
  })
  @IsNumber()
  price: number;

  @ApiProperty({
    description: 'Category id(uuid)',
    example: 'f4f4f4f4-f4f4-f4f4-f4f4-f4f4f4f4f4f4',
  })
  @IsUUID()
  categoryId: string;
}
