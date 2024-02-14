// In navbar.component.ts
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { FilterService } from '../../services/filter.service';
import { CartService } from '../../services/cart.service';
import { CartOverlayService } from '../../services/cart-overlay.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  

  viewMode: 'grid' | 'list' = 'grid'; // Default view mode
  selectedCategory: string = 'All';
  cartItemCount: number = 0; 
  displayedProductsCount: number = 0; 
  isCartDropdownVisible: boolean = false;

  constructor(private router: Router,
    private cartService: CartService,
    private productService: ProductService,
    private filterService: FilterService,
    private cartOverlayService: CartOverlayService) { }
  
  ngOnInit() {
    this.cartService.getCartItemCount().subscribe(count => {
      this.cartItemCount = count;
    });

     // Subscribe to the displayed product count updates
     this.filterService.displayedProductCount$.subscribe(count => {
      this.displayedProductsCount = count;
    });

  }

 
  filterProducts(category: string): void {
    console.log("nav Filtering products for category:", category);
    this.selectedCategory = category;
    this.filterService.changeCategory(category);
  }

  
  goToCart(): void {
   this.router.navigate(['/cart']); 
  }

  setViewMode(mode: 'grid' | 'list'): void {
    this.viewMode = mode;
}

  sortBy(criteria: string): void {
   // Implement your logic to sort products
   console.log('Sorting by:', criteria);
  }
  
  toggleCartDropdown(): void {
   this.isCartDropdownVisible = !this.isCartDropdownVisible;
    console.log('Cart icon clicked');
  }
  
  
  openCartOverlay(): void {
    this.cartOverlayService.openCartOverlay();
  }

}

