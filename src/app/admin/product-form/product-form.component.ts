import { Router } from '@angular/router';
import { ProductService } from './../../services/product.service';
import { Component } from '@angular/core';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent {

  categories;

  constructor(
    private categoryService: CategoryService,
    private router: Router,
    private productService: ProductService
  ) {
    this.categories = categoryService.getCategories()
      .snapshotChanges()
      .map(category => {
        return category.map(c => ({ key: c.payload.key, ...c.payload.val() }));
      });
  }
  save(product) {
    this.productService.create(product);
    this.router.navigate(['/admin/products']);
  }

}
