import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { ProductsComponent } from './components/products/products.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { AppRoutingModule } from './app.routes';
import { ProductService } from './services/product.service';
import { SearchPipe } from './components/products/search-pipe';


@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    ProductDetailComponent,
    SearchPipe
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule
  ],
  providers: [ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
