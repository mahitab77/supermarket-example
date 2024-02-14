import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { FilterService } from '../../services/filter.service';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products-display',
  templateUrl: './products-display.component.html',
  styleUrls: ['./products-display.component.css']
})
export class ProductsDisplayComponent implements OnInit {
  
 
  viewMode: string = 'grid'; // Set default view mode to 'grid'

  products: Product[] = [];
  filteredProducts: Product[] = [];
  // A map to keep track of product quantities in the cart
  productQuantities: Map<number, number> = new Map();

  constructor(private productService: ProductService,
              private filterService: FilterService,
              private cartService: CartService,
              private router: Router) { }

  ngOnInit(): void {
    // Fetch all products
    this.productService.getProducts().subscribe(products => {
      this.products = products;
      // Initially display all products
      this.filterProducts('All');
    });

    // Subscribe to category changes for filtering products
    this.filterService.selectedCategory$.subscribe(category => {
      this.filterProducts(category);
    });

    // Subscribe to cart changes to update product quantities
    this.cartService.getItems().subscribe(cartItems => {
      // Reset the map to track quantities for the current cart state
      this.productQuantities.clear();
      cartItems.forEach(item => {
        this.productQuantities.set(item.product.id, item.quantity);
      });
    });
  }

  
setViewMode(mode: 'grid' | 'list'): void {
  this.viewMode = mode;
}

sortBy(criteria: string): void {
    if (criteria === 'newest') {
      this.filteredProducts.sort((a, b) => new Date(b.prodDate).getTime() - new Date(a.prodDate).getTime());
    } else if (criteria === 'price') {
      this.filteredProducts.sort((a, b) => a.price - b.price);
    } else if (criteria === 'name') {
      this.filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
    }
}

 // Filter products based on the selected category
filterProducts(category: string = 'All'): void {
  if (category === 'All') {
    this.filteredProducts = this.products;
  } else {
    this.filteredProducts = this.products.filter(product => 
      product.category.toLowerCase() === category.toLowerCase());
  }
  // Use this.filteredProducts.length instead of filtered.length
  this.filterService.updateDisplayedProductCount(this.filteredProducts.length);
}


  // Add a product to the cart
  addToCart(product: Product): void {
    this.cartService.addToCart(product);
  }

  // Retrieve the quantity of a specific product in the cart
  getQuantity(productId: number): number {
    return this.productQuantities.get(productId) || 0;
  }

  openProductDetail(productId: number): void {
    // Navigate to the product detail page with the product ID as a route parameter
    this.router.navigate(['/products', productId]);
  }
  
}

  
