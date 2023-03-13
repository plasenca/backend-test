/* eslint-disable prettier/prettier */

import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
export class QueryCategoryDto {
  @ApiProperty({description: 'Category name or Category ID', uniqueItems: true, example: 'Ropa'})
  @IsString()
  @IsOptional()
  category: string;
}
