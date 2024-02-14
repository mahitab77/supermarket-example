import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductsDisplayComponent } from './components/products-display/products-display.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CartComponent } from './components/cart/cart.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

@NgModule({
  declarations: [
    AppComponent,
    ProductsDisplayComponent,
    ProductDetailComponent,
    NavbarComponent,
    CartComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    FontAwesomeModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
