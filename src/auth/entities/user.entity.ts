import {Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate, OneToMany} from 'typeorm';
import { Product } from 'src/products/entities';

@Entity({ name: 'users'})
export class User {
  
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', {
    unique: true,
  })
  email: string;

  @Column('text')
  password: string;

  @Column('text', {
    name: 'full_name'
  })
  fullName: string;

  @Column('boolean', {
    name: 'is_active',
    default: true
  })
  isActive: boolean;
  
  @Column('text', {
    array: true,
    default: ['user']
  })
  roles: string[];

  @OneToMany(
    () => Product,
    product => product.user,
  )
  product: Product[]

  @BeforeInsert()
  checkFieldsBeforeInsert() {
    this.email= this.email.toLowerCase().trim()
  }

  @BeforeUpdate()
  checkFieldsBeforeUpdate() {
    this.checkFieldsBeforeInsert()
  }
}
