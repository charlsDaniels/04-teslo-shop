import { Injectable } from '@nestjs/common';
import { ProductsService } from 'src/products/products.service';
import { initialData } from './data/seed.data';
import { User } from 'src/auth/entities/user.entity';

@Injectable()
export class SeedService {

  constructor(
    private readonly productsService: ProductsService,
  ) {}

  private async deleteRecords() {
    await this.productsService.deleteAllProducts()
  }

  private async insertNewRecords(user: User) {
    const { products } = initialData

    const insertPromises = products.map(product => this.productsService.create(product, user))

    await Promise.all(insertPromises)
  }

  async runSeed(user: User) {
    this.deleteRecords()
    this.insertNewRecords(user)
    return `The products have been inserted`;
  }

}
