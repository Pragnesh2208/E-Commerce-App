import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {
  CartResolver,
  OrderResolver,
  WishlistResolver,
  OrderListResolver,
} from './resolvers/index';

import {ROUTE} from 'src/app/shared/constants/index';

import {
  CartComponent,
  OrderListComponent,
  OrderComponent,
  WishlistComponent,
} from './components/index';
import {ShoppingComponent} from './shopping.component';

const routes: Routes = [
  {
    path: '',
    component: ShoppingComponent,
    children: [
      {
        path: ROUTE.showCart,
        component: CartComponent,
        resolve: {cart: CartResolver},
      },
      {
        path: ROUTE.showWishlist,
        component: WishlistComponent,
        resolve: {wishlists: WishlistResolver},
      },
      {
        path: ROUTE.showOrder,
        component: OrderComponent,
        resolve: {orders: OrderResolver},
      },
      {
        path: ROUTE.showOrderList,
        component: OrderListComponent,
        resolve: {orderList: OrderListResolver},
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShoppingRoutingModule {}
