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
  page;
  numberOfProducts: number;
  products: Product[];
  filteredProducts: any[];
  subscription: Subscription;
  constructor(private productService: ProductService) { }

  ngOnInit() {
    // filter yapmak için subscribe ile diziye atıyoruz
    this.subscription = this.productService.getAll().snapshotChanges()
      .map(changes => {
        return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
      })
      .subscribe(products => {

        this.products = products;
        this.filteredProducts = this.products.slice(0, 10);
        this.numberOfProducts = products.length;

        this.page = 1;
      });
  }

  filter(query: string) {
    this.filteredProducts = (query) ?
      this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase())) :
      this.products.slice(0, 10);
  }

  changePage(numberOfPage: number) {
    this.filteredProducts = this.products.slice((numberOfPage - 1) * 10, (numberOfPage * 10));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
