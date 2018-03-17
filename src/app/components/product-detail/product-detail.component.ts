import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Product} from '../../shared/product.model';
import {ProductService} from '../../services/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.html',
  styleUrls: ['./product-detail.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class ProductDetailComponent implements OnInit {

  product: Product = new Product();

  constructor(private route: ActivatedRoute,
              private cdr: ChangeDetectorRef,
              private productService: ProductService) { }

  ngOnInit() {

    this.route.params
      .subscribe(params => {
        const productId = +params['id'] || 1;
        this.getProduct(productId);
      });
  }

  save(){
    this.productService.save(this.product);
    this.getProduct(this.product.id);
  }

  private getProduct(id: number){
    this.product = this.productService.getProduct(id);
    this.productService.sendProduct(this.product);
    this.cdr.detectChanges();
  }
}
