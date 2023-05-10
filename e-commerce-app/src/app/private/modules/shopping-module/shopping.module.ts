import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {ShoppingRoutingModule} from './shopping-routing.module';
import {
  OrderComponent,
  CartComponent,
  WishlistComponent,
  OrderListComponent,
} from './components/index';

import {ShoppingComponent} from './shopping.component';
import {SharedModule} from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    CartComponent,
    WishlistComponent,
    ShoppingComponent,
    OrderComponent,
    OrderListComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    ShoppingRoutingModule,
  ],
  exports: [ShoppingComponent],
})
export class ShoppingModule {}
