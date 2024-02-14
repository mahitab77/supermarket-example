export class Product {
  id!: number;
  name!: string;
  description?:string | null; 
  price!: number;
  weight?: number | null; 
  length?: number | null; 
  width?: number | null; 
  category!: string;
  subcategory?:String | null; 
  imageUrl!: string;
  prodDate!: string;
  expDate!: string;
}
