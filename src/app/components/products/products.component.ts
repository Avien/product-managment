import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Product} from '../../shared/product.model';
import {ProductService} from '../../services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.html',
  styleUrls: ['./products.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsComponent implements OnInit {

  products: Product[];
  activeIndex: number;
  private currentProduct: Product;

  constructor(private router: Router,
              private productService: ProductService) { }

  ngOnInit() {
    this.productService.products$.subscribe((products: Product[]) => {
      this.products = products;

      let index = 0;

      if(this.productService.isNew){
        this.productService.isNew = false;
        index = this.products.length-1;
      }

      if (!this.currentProduct){
        this.loadProduct(this.products[0], index);
      }
    });
  }

  loadProduct(product: Product, index: number = 0){
    if (product){
      this.activeIndex = index;
      this.currentProduct = product;
      this.router.navigate(['products', product.id]);
    }
  }

  delete(product: Product, index: number){
    this.productService.delete(product);

    if(index < this.activeIndex){
      this.activeIndex -= 1;
    }

    if (this.currentProduct.id === product.id){
      this.loadProduct(this.products[0]);
    }
  }

  add() {
    this.currentProduct = null;
    this.productService.isNew = true;
    this.activeIndex = -1;
    this.router.navigate(['products', this.productService.generateId()]);
  }

  sort(param, descending = false) {

    this.products.sort((productA, productB) => {
      if (productA[param] < productB[param]) {
        return descending ? 1 : -1;
      } else if (productA[param] > productB[param]) {
        return descending ? -1 : 1;
      }
      return 0;
    });

    this.activeIndex = this.products.findIndex(item => this.currentProduct.id === item.id);
  }

}
