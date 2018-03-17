import { TestBed, inject } from '@angular/core/testing';

import { ProductService } from './product.service';
import {productsData} from '../shared/products.mock-data';

describe('ProductService', () => {

  const products = productsData;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductService]
    });
  });

  it('should be created', inject([ProductService], (service: ProductService) => {
    expect(service).toBeTruthy();
  }));

  it('should return a product by id', inject([ProductService], (service: ProductService) => {
    const product = products[0];
    expect(service.getProduct(product.id)).toEqual(product);
  }));

  it('should return the product index', inject([ProductService], (service: ProductService) => {
    const index = 4,
      product = products[index];

    expect(service.getIndex(product)).toEqual(index);
  }));

  it('should delete the product', inject([ProductService], (service: ProductService) => {
    const product = products[4];
    expect(products[4]).toBeDefined();
    service.delete(product);
    expect(products[4]).toBeUndefined();
  }));

});
