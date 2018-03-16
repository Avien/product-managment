import { Injectable } from '@angular/core';
import {productsData} from '../shared/products.mock-data';
import {Product} from '../shared/product.model';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class ProductService {

  products$: Observable<Product[]>;
  private products = productsData;
  private productsSource: BehaviorSubject<Product[]> = new BehaviorSubject(this.products);
  private _isNew: boolean = false;

  constructor() {
    this.products$ = this.productsSource.asObservable();
  }

  getProduct(id: number): Product {
    if(this.isNew) {
      return new Product(id);
    }
    const product = this.products.find(product => product.id === id);
    return Object.assign({}, product);
  }

  save(product: Product){
    const index = this.products.findIndex(item => product.id === item.id);

    if (index !== -1){
        this.products[index] = product;
        this.products = [...this.products];
    } else { // new item
      this.products = [...this.products, product];
    }

    this.sendProducts();
  }

  delete(product: Product){

    this.products.splice(this.products.indexOf(product), 1);
    this.products = [...this.products];
    this.sendProducts();
  }

  sendProducts() {
    this.productsSource.next(this.products);
  }

  generateId(){
    return Math.round(Math.random() * 1000000);
  }

  set isNew(value: boolean){
    this._isNew = value;
  }

  get isNew(): boolean{
    return this._isNew;
  }
}
