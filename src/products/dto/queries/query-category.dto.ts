/* eslint-disable prettier/prettier */

import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
export class QueryCategoryDto {
  @ApiProperty({description: 'Category name', uniqueItems: true, example: 'Ropa'})
  @IsString()
  @IsOptional()
  name: string;
}
