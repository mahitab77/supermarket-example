import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../models/product';
import { CartItem } from '../models/cart-item.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  
  private itemsInCart: CartItem[] = [];
  private itemsInCartSubject = new BehaviorSubject<CartItem[]>([]);

  constructor() {
    this.itemsInCartSubject.subscribe(_ => this.itemsInCart = _);
  }

  
///////////////////////////////////////////////////////////////////////////////////////////////////////////


/*addToCart(product: Product, selectedWeight?: number, quantity: number = 1): void {
  let weightId: string;

  // Generate a unique identifier (weight-id)
  if (selectedWeight !== undefined) {
    weightId = `${product.id}-${selectedWeight}`;
  } else if (product.weight !== null && product.weight !== undefined) {
    weightId = `${product.id}-${product.weight}`;
  } else {
    weightId = product.id.toString(); // Convert product.id to string
  }

  // Check if the product with the same weight-id already exists in the cart
  const existingItemIndex = this.itemsInCart.findIndex(item => item.weightId === weightId);

  if (existingItemIndex !== -1) {
    // If the product already exists in the cart, update its quantity
    this.itemsInCart[existingItemIndex].quantity += quantity;
  } else {
    // If the product does not exist in the cart, add it with the weight-id
    const newItem: CartItem = {
      product,
      weightId,
      weight: selectedWeight !== undefined ? selectedWeight : product.weight,
      quantity
    };
    this.itemsInCart.push(newItem);
  }

  // Update the cart with the modified or new item
  this.itemsInCartSubject.next(this.itemsInCart);
}*/
//////////////////////////////////////////////////////////////////////////////////////////////
public addToCart(product: Product, selectedWeight?: number, quantity: number = 1): Observable<boolean> {
  let weightId: string;

  // Generate a unique identifier (weight-id)
  if (selectedWeight !== undefined) {
    weightId = `${product.id}-${selectedWeight}`;
  } else if (product.weight !== null && product.weight !== undefined) {
    weightId = `${product.id}-${product.weight}`;
  } else {
    weightId = product.id.toString(); // Convert product.id to string
  }

  // Check if the product with the same weight-id already exists in the cart
  const existingItemIndex = this.itemsInCart.findIndex(item => item.weightId === weightId);

  if (existingItemIndex !== -1) {
    // If the product already exists in the cart, update its quantity
    this.itemsInCart[existingItemIndex].quantity += quantity;
  } else {
    // If the product does not exist in the cart, add it with the weight-id
    const newItem: CartItem = {
      product,
      weightId,
      weight: selectedWeight !== undefined ? selectedWeight : product.weight,
      quantity
    };
    this.itemsInCart.push(newItem);
  }

  // Update the cart with the modified or new item
  this.itemsInCartSubject.next(this.itemsInCart);

  // Return an observable indicating the success of the operation
  return of(true);
}


//////////////////////////////////////////////////////////////////////////////////////////////
  
public removeFromCart(productId: number, weightId: string, weight?: number): void {
  const updatedCart = this.itemsInCart.reduce((acc, current) => {
      if (current.product.id === productId && current.weightId === weightId) {
          if (current.quantity > 1) {
              acc.push({ ...current, quantity: current.quantity - 1 });
          }
      } else {
          acc.push(current);
      }
      return acc;
  }, [] as CartItem[]);

  this.itemsInCartSubject.next(updatedCart);
}


////////////////////////////////////////////////////////////////////////////////////////////////  
  public removeItemCompletely(productId: number, weightId: string): void {
    const updatedCart = this.itemsInCart.filter(item => !(item.product.id === productId && item.weightId === weightId));
    this.itemsInCartSubject.next(updatedCart);
  }

  public getItems(): Observable<CartItem[]> {
    return this.itemsInCartSubject.asObservable();
  }

  public getCartItemCount(): Observable<number> {
    return this.itemsInCartSubject.asObservable()
      .pipe(map(items => items.reduce((acc, current) => acc + current.quantity, 0)));
  }

  public clearCart(): void {
    this.itemsInCartSubject.next([]);
  }

  
  public updateQuantity(productId: number, newQuantity: number, weight: number): void {
    const updatedCart = this.itemsInCart.map(item => {
      if (item.product.id === productId && item.weight === weight) {
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
  
    this.itemsInCartSubject.next(updatedCart);
  }
  
  
public checkout(): Observable<boolean> {
  
  // For this example, we'll just clear the cart and simulate a successful checkout
  this.clearCart();
  return of(true);
}

}



  
  

 

 
