import { Product } from './../../interfaces/product';
import { Subscription } from 'rxjs/Rx';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../../services/product.service';


@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  numberOfProducts: number;
  page = 1;
  products: Product[];
  filteredProducts: any[];
  subscription: Subscription;
  constructor(private productService: ProductService) { }

  ngOnInit() {
    // filter yapmak için subscribe ile diziye atıyoruz
    this.subscription = this.productService.getAll()
      .map(changes => {
        return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
      })
      .subscribe(products => {
        this.filteredProducts = this.products = products;
        this.numberOfProducts = products.length;
      });
  }

  filter(query: string) {
    this.filteredProducts = (query) ?
      this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase())) :
      this.products;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  changePage(pageNumber) {
    console.log(pageNumber);
  }
}
