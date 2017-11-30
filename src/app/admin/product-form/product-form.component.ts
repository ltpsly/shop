import { Router, ActivatedRoute } from '@angular/router';
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

  public product = {};
  private productId;

  constructor(
    private categoryService: CategoryService,
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService
  ) {

    this.categories = categoryService.getAll()
      .snapshotChanges()
      .map(category => {
        return category.map(c => ({ key: c.payload.key, ...c.payload.val() }));
      });

    let id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.productService.get(id).subscribe(action => {
        this.product = action.payload.val();
        this.productId = action.key;
      });
    }

  }

  save(product) {
    if (this.productId) {
      this.productService.update(this.productId, product);
    } else {
      this.productService.create(product);
    }
    this.router.navigate(['/admin/products']);
  }

  delete() {
    if (!confirm('Are you sure you want to delete this product?')) return;

    this.productService.delete(this.productId);
    this.router.navigate(['/admin/products']);

  }

}