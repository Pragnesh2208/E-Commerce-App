import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterModule} from '@angular/router';
import {FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BehaviorSubject, concatMap} from 'rxjs';

import {NotificationService} from '../../../../../shared/services/notification.service';
import {ShoppingService} from '../../services/shopping.service';

import {
  Cart,
  CartProduct,
  ConfirmOrder,
  SessionResponse,
} from '../../models/shopping.model';

import {ROUTE, MESSAGE} from '../../../../../shared/constants/index';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ShoppingRoutingModule } from '../../shopping-routing.module';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  standalone:true,
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ]
})
export class CartComponent implements OnInit {
  readonly routePath = ROUTE;

  priceForm: FormGroup = this.fb.group({
    quantity: this.fb.array([]),
  });

  cart!: Cart;
  orderList: ConfirmOrder[] = [];
  activeBtn!: boolean;

  private stateSource = new BehaviorSubject<Cart>(this.cart);
  stateClear = this.stateSource.asObservable();

  constructor(
    private shoppingService: ShoppingService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private notificationService: NotificationService,
    private route: Router,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe((response) => {
      this.cart = response['cart'];
      this.activeBtn = this.cart.cartItems.length > 0;

      for (let item of this.cart.cartItems) {
        (this.priceForm.get('quantity') as FormArray).push(
          this.fb.control(item.quantity),
        );
      }
    });
  }

  confirmOrder() {
    for (let cartProduct in this.cart.cartItems) {
      const currentOrder = {
        price: this.cart.cartItems[cartProduct].product.price,
        productId: this.cart.cartItems[cartProduct].product.id,
        productName: this.cart.cartItems[cartProduct].product.name,
        quantity: this.cart.cartItems[cartProduct].quantity,
        userId: this.cart.cartItems[cartProduct].id,
      } as ConfirmOrder;

      this.orderList.push(currentOrder);
    }

    this.shoppingService
      .createCheckoutSession(this.orderList)
      .pipe(
        concatMap((response: SessionResponse) => {
          return this.shoppingService.confirmOrder(response['sessionId']);
        }),
      )
      .subscribe(
        () => {
          this.activeBtn = false;
          this.cart.cartItems = [];
          this.notificationService.success(MESSAGE.confirmOrder);
          this.route.navigate([ROUTE.showOrder]);
        },
        (e) => {
          this.notificationService.failed(e.error);
        },
      );
  }

  removeItemFromCart(currentId: number): void {
    this.shoppingService.deleteFromCart(currentId).subscribe(() => {
      const removeIndex = this.cart.cartItems.findIndex(
        (item) => item.id == currentId,
      );
      this.cart.cartItems.splice(removeIndex, 1);
      (this.priceForm.get('quantity') as FormArray).removeAt(removeIndex);
      this.activeBtn = this.cart.cartItems.length > 0;
      this.stateSource.next(this.cart);
      this.notificationService.success(MESSAGE.removefromCart);
    });
  }

  getProductPrice(price: number, id: number): number {
    return this.priceForm.controls['quantity'].value[id] * price;
  }

  updateItemFromCart(currentItem: CartProduct, currentId: number): void {
    const updatedCart = {
      id: currentItem.id,
      productId: currentItem.product.id,
      quantity: this.priceForm.controls['quantity'].value[currentId],
    };

    this.shoppingService.updateFromCart(updatedCart).subscribe();
  }
}
