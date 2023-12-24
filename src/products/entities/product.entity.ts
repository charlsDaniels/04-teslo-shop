import { Column, Entity, OneToMany, PrimaryGeneratedColumn, BeforeInsert, ManyToOne } from 'typeorm';
import { ProductImage } from "./product-image.entity";
import { User } from 'src/auth/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'products'})
export class Product {

  @ApiProperty({
    example: '03309c73-c3ab-4b46-83d4-73f9f48da910',
    description: 'Product ID',
    uniqueItems: true
  })
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ApiProperty()
  @Column('text', {
    unique: true
  })
  title: string

  @ApiProperty()
  @Column('numeric', {
    default: 0
  })
  price: number

  @ApiProperty()
  @Column({
    type: 'text',
    nullable: true
  })
  description: string

  @ApiProperty()
  @Column('text', {
    unique: true,
  })
  slug?: string

  @ApiProperty()
  @Column('int', {
    default: 0
  })
  stock: number

  @Column('text', {
    array: true
  })
  sizes: string[]

  @Column('text')
  gender: string

  @Column('text', {
    array: true,
    default: []
  })
  tags: string[]

  @OneToMany(
    () => ProductImage,
    productImage => productImage.product,
    { cascade: true, eager: true }
  )
  images?: ProductImage[]

  @ManyToOne(
    () => User,
    user => user.product,
    { eager: true }
  )
  user: User

  @BeforeInsert()
  checkSlugInsert() {
    if (!this.slug) {
      this.slug = this.title
    }

    this.slug = this.slug
      .toLowerCase()
      .replaceAll("'", "")
      .replaceAll(" ", "_")
  }

}
