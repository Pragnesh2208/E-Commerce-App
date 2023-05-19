import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, RouterModule} from '@angular/router';
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';
import {ShoppingService} from 'src/app/private/modules/shopping-module/services/shopping.service';
import {Product, CategoryProduct} from '../../models/shared.model';

import {NotificationService} from '../../services/notification.service';

import {AddToCart} from 'src/app/private/modules/shopping-module/models/shopping.model';
import {SuccessResponse} from '../../models/shared.model';
import {BASE, ROUTE, MESSAGE} from '../../constants/index';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-show-product',
  templateUrl: './show-product.component.html',
  styleUrls: ['./show-product.component.scss'],
  standalone: true,
  imports :[ CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,]
})
export class ShowProductComponent implements OnInit {
  readonly routePath = ROUTE;

  contentObject!: Product;
  wishListButtonName: string = BASE.addToWishList;
  quantity = this.fb.control([1]);

  constructor(
    private activatedRoute: ActivatedRoute,
    private shoppingService: ShoppingService,
    private fb: FormBuilder,
    private notificationService: NotificationService,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe((response) => {
      this.contentObject = response['product'];
    });
  }

  addToWishlist(product: Product) {
    let wishItem = product as CategoryProduct;
    this.shoppingService.addToWishList(wishItem).subscribe(
      (response: SuccessResponse) => {
        this.wishListButtonName = BASE.addedToWishList;
      },
      (e) => {
        this.notificationService.failed(e.error);
      },
    );
  }

  addToCart(product: Product) {
    let cartItem: AddToCart = {
      id: product.categoryId,
      productId: product.id,
      quantity: Number(this.quantity.value),
    };
    this.shoppingService.addToCart(cartItem).subscribe(
      (response: SuccessResponse) => {
        this.notificationService.success(MESSAGE.addToCart);
      },
      (e) => {
        this.notificationService.failed(e.error);
      },
    );
  }
}
