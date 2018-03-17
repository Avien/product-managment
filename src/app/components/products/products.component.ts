import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
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
  searchString: string;
  private selectedProduct: Product;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private cdr: ChangeDetectorRef,
              private productService: ProductService) { }

  ngOnInit() {

    this.productService.products$.subscribe((products: Product[]) => {
      this.products = products;
    });

    this.productService.product$.subscribe((product: Product) => {
       const index = this.productService.getIndex(product);
       this.setSelectedProduct(this.products[index], index);
       this.cdr.detectChanges();
    });
  }

  loadProduct(product: Product, index: number = 0){
    if (product){
      this.setSelectedProduct(product, index);
      this.router.navigate(['products', product.id]);
    }
  }

  delete(product: Product, index: number){
    this.productService.delete(product);

    if(index < this.activeIndex){
      this.activeIndex -= 1;
    }

    if (this.selectedProduct.id === product.id){
        this.loadProduct(this.products[0]);
    }
  }

  add() {
    this.selectedProduct = null;
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

    this.activeIndex = this.productService.getIndex(this.selectedProduct);
  }

  private setSelectedProduct(product: Product, index: number = 0){
    this.activeIndex = index;
    this.selectedProduct = product;
  }
}
