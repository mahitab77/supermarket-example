import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { ViewChild } from '@angular/core';
import { Product } from '../../models/product';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent implements OnInit {
  @ViewChild('quantityInput') quantityInput: any;
  
  quantity: number = 1;
  selectedWeight: number = 250; // Default weight value
  showQuantityIndicator: boolean = false;

  productId!: number;
  productDetails: any;
  
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam !== null) {
        this.productId = +idParam;
        this.loadProductDetails();
      } else {
        console.error('Product ID is null.');
      }
    });
  }
  
 
  
  addToCart(): void {
    // Calculate the price based on the selected weight
    const calculatedPrice = this.calculatePrice(this.selectedWeight);
    
    // Create a new product object with the calculated price
    const productWithWeight = { ...this.productDetails, price: calculatedPrice };
    // Add the product to the cart with the selected weight and quantity
    this.cartService.addToCart(productWithWeight, this.selectedWeight, this.quantity)
      .subscribe(() => {
        // Set showQuantityIndicator to true to display the quantity indicator
        this.showQuantityIndicator = true;

        // Reset the quantity input field
        this.quantity = 1;
        this.quantityInput.nativeElement.value = 1; // Reset the input field
      });
  }
  
  
  loadProductDetails(): void {
    this.productService.getProductById(this.productId)?.subscribe(data => {
      this.productDetails = data;
    });
  }

  
    
  
  calculatePrice(weight: number): number {
    // Retrieve the price per unit weight from the product details
    const pricePerUnitWeight = this.productDetails.price / this.productDetails.weight;
    
    // Calculate the price based on the selected weight
    const calculatedPrice = pricePerUnitWeight * weight;
    
    // Return the calculated price
    return calculatedPrice;
  }
  
  incrementQuantity(): void {
    this.quantity++;
    this.updateCartQuantity();
  }
  
  decrementQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
      this.updateCartQuantity();
    }
  }
  
  
  private updateCartQuantity(): void {
    if (this.productDetails) {
      this.cartService.updateQuantity(this.productId, this.quantity, this.selectedWeight);
    }
  }
  
  // Reset the quantity when the user selects a different weight
  resetQuantity(): void {
    this.quantity = 1;
    this.showQuantityIndicator = false; // Reset the indicator
    this.calculatePrice(this.selectedWeight);
  }
  
  isFoodCategory(): boolean {
    return this.productDetails?.category === 'Food';
  }
  
}



    