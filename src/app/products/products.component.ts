import { Product } from './../interfaces/product';
import { ActivatedRoute } from '@angular/router';
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
  category: string;
  constructor(
    private router: ActivatedRoute,
    private productService: ProductService
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

  }
}
