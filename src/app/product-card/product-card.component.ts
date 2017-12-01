import { ShoppingCartService } from '../services/shopping-cart.service';
import { Product } from './../interfaces/product';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input('product') product;
  @Input('show-actions') showActions = true;
  constructor(
    private cartService: ShoppingCartService
  ) { }
  addToCart(product: Product) {

    this.cartService.addToCart(product);

 
  }
}
