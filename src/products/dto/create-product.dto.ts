import { IsArray, IsInt, IsNumber, IsOptional, IsPositive, IsString, MinLength } from "class-validator"

export class CreateProductDto {

  @IsString()
  @MinLength(1)
  title: string

  @IsNumber()
  @IsPositive()
  price: number

  @IsString()
  description: string

  @IsString()
  @IsOptional()
  slug: string

  @IsInt()
  @IsPositive()
  stock: number

  @IsArray()
  sizes: string[]

  @IsString()
  gender: string

  @IsString({ each: true })
  @IsArray()
  @IsOptional()
  tags: string[]

  @IsString({ each: true })
  @IsArray()
  @IsOptional()
  images: string[]

}
