import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product';
import { CartItem } from '../../models/cart-item.model';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})

export class CartComponent implements OnInit {
  
  cartItems: CartItem[] = [];
  isCartOpen: boolean = false; 

  constructor(private cartService: CartService) {}


  ngOnInit(): void {
    this.cartService.getItems().subscribe(items => {
      this.cartItems = items;
    });
  }

  addOne(item: CartItem): void {
    const weight = item.weight !== null ? item.weight : undefined;
    this.cartService.addToCart(item.product, weight, 1);
}

removeOne(item: CartItem): void {
    const weight = item.weight !== null ? item.weight : undefined;
    this.cartService.removeFromCart(item.product.id, item.weightId, weight);
}

  removeItemCompletely(item: CartItem): void {
   // this.cartService.removeItemCompletely(item.product.id);
    this.cartService.removeItemCompletely(item.product.id, item.weightId);
  }
  
  displayUnitPricePerWeight(item: CartItem): string {
    // Round the price to two decimal places
  const roundedPrice = item.product.price.toFixed(2);

  // If weight is defined, include it in the string
  if (item.weight !== undefined) {
    return `${roundedPrice} EGP / ${item.weight} gm`;
  } else {
    return `${roundedPrice} EGP`;
  }
  }

  calculateSubtotal(): number {
   // Calculate the subtotal by multiplying each product's price by its quantity
  const subtotal = this.cartItems.reduce((acc, curr) => acc + (curr.product.price * curr.quantity), 0);
  
  // Format the subtotal to have only two digits after the decimal point
  return parseFloat(subtotal.toFixed(2));
  }

  checkout(): void {
    // Placeholder for checkout logic
  }

  addToWishlist(product: Product): void {
    // Placeholder for adding product to wishlist logic
  }

  clearCart(): void {
    this.cartService.clearCart();
  }

  // Method to open the cart
  openCart() {
    this.isCartOpen = true;
  }

  // Method to close the cart
  closeCart() {
    this.isCartOpen = false;
  }

}

