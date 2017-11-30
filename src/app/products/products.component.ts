import { Product } from './../interfaces/product';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from '../services/category.service';
import { ProductService } from '../services/product.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  categories;
  category;
  constructor(
    private router: ActivatedRoute,
    private productService: ProductService,
    private categoryService: CategoryService
  ) { }

  ngOnInit() {
    this.productService.getAll().snapshotChanges().subscribe(products => {
      products.forEach(element => {
        this.products.push(element.payload.val());
      });

      this.router.queryParamMap.subscribe(params => {

        this.category = params.get('category');

        this.filteredProducts = (this.category) ?
          this.products.filter(p => p.category === this.category) :
          this.products;

      });

    });

    this.categories = this.categoryService.getAll().snapshotChanges().map(category => {
      return category.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
    
  }
}
