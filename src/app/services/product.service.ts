import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private productsUrl = 'assets/products.json';

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productsUrl);
  }
  
  getProductById(id: number): Observable<Product | undefined> {
    console.log('Product ID in service:', id); 
    return this.getProducts().pipe(
      map(products => products.find(product => product.id === id))
    );
  }
  
  
  getCategories(): Observable<string[]> {
    return this.getProducts().pipe(
      map(products => [...new Set(products.map(product => product.category))])
    );
  }
}