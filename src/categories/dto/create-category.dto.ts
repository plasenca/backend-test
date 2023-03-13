import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({
    description: 'Category name',
    uniqueItems: true,
    example: 'Category 1',
  })
  @IsString()
  name: string;
}
