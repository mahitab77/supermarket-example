import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsDisplayComponent } from './components/products-display/products-display.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { CartComponent } from './components/cart/cart.component';


const routes: Routes = [
  { path: '', component: ProductsDisplayComponent },
  { path: 'products/:id', component: ProductDetailComponent },
  { path: 'cart', component: CartComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
