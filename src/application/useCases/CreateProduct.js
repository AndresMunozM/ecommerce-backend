const Product = require('../../domain/entities/Product');

class CreateProduct {
  constructor(productRepository) {
    this.productRepository = productRepository;
  }

  async execute(productData) {
    const product = new Product(productData);
    return await this.productRepository.create(product);
  }

  async getAll() {
    console.log('>>> Retrieving all products from use case');
    const products = await this.productRepository.getAll();
    console.log('Products retrieved from use case:', products);
    return products;
  }
}

module.exports = CreateProduct;