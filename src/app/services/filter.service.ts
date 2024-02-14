import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable  } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  private selectedCategorySource = new BehaviorSubject<string>('All');
  selectedCategory$ = this.selectedCategorySource.asObservable();
  
  private displayedProductCountSource = new BehaviorSubject<number>(0);
  displayedProductCount$ = this.displayedProductCountSource.asObservable();

  changeCategory(newCategory: string): void {
    console.log("Changing category in FilterService to:", newCategory);
    this.selectedCategorySource.next(newCategory);
  }
  
  updateDisplayedProductCount(count: number): void {
    this.displayedProductCountSource.next(count);
  }

}
