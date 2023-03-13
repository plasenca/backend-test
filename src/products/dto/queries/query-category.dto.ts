/* eslint-disable prettier/prettier */

import { IsOptional, IsString } from 'class-validator';
export class QueryCategoryDto {
  @IsString()
  @IsOptional()
  name: string;
}
