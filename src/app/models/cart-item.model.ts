
import { Product } from './product';

export interface CartItem {
  product: Product;
  weightId: string; // Unique identifier combining product ID and weight
  weight?: number | null; // Optional weight value
  quantity: number; // Quantity of the product in the cart
}