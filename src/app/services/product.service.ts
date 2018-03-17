import { Injectable } from '@angular/core';
import {productsData} from '../shared/products.mock-data';
import {Product} from '../shared/product.model';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class ProductService {

  private products = productsData;
  products$: Observable<Product[]>;
  private productsSource: BehaviorSubject<Product[]> = new BehaviorSubject(this.products);
  product$: Observable<Product>;
  private productSource: Subject<Product> = new Subject();
  private _isNew: boolean = false;

  constructor() {
    this.products$ = this.productsSource.asObservable();
    this.product$ = this.productSource.asObservable();
  }

  getProduct(id: number): Product {
    if(this.isNew) {
      this.isNew = false;
      return new Product(id);
    }
    const product = this.products.find(product => product.id === id);
    return Object.assign({}, product);
  }

  save(product: Product){
    const index = this.getIndex(product);

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

  sendProduct(product: Product){
    this.productSource.next(product);
  }

  generateId(){
    return Math.round(Math.random() * 1000000);
  }

  getIndex(product: Product){
    return this.products.findIndex(item => product.id === item.id);
  }

  set isNew(value: boolean){
    this._isNew = value;
  }

  get isNew(): boolean{
    return this._isNew;
  }
}
