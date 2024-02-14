// cart-overlay.service.ts

import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CartComponent } from '../components/cart/cart.component';

@Injectable({
  providedIn: 'root'
})
export class CartOverlayService {

  constructor(private dialog: MatDialog) { }

  openCartOverlay(): void {
    this.dialog.open(CartComponent, {
      width: '400px', // Set width as desired
      height: 'auto', // Set height as desired
      panelClass: 'cart-overlay-dialog' // Optional custom CSS class for styling
    });
  }
}
