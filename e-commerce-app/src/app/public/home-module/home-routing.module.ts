import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {
  ProductComponent,
  ShowProductComponent,
  CategoryComponent,
  PageNotFoundComponent,
} from '../../shared/components';
import {ROUTE} from '../../shared/constants';
import {ValidateIdGuard} from '../../shared/guards';
import {
  ProductComponentResolver,
  CategoryComponentResolver,
} from '../../shared/resolvers';
import {HomeComponent} from './home.component';
import { MainBgComponent } from './components/main-bg/main-bg.component';
import { CartComponent, WishlistComponent, OrderComponent, OrderListComponent } from 'src/app/private/modules/shopping-module/components';
import { CartResolver, WishlistResolver, OrderResolver, OrderListResolver } from 'src/app/private/modules/shopping-module/resolvers';

const routes: Routes = [
  
      {
        path: '',
        component: MainBgComponent,
        resolve: {
          categories: CategoryComponentResolver,
          products: ProductComponentResolver,
        }
      },
      {
        path: ROUTE.showProduct,
        component: ShowProductComponent,
        resolve: {product: ProductComponentResolver},
        canActivate: [ValidateIdGuard],
      },
      {
        path: ROUTE.category,
        component: CategoryComponent,
        resolve: {categories: CategoryComponentResolver},
      },
      {
        path: ROUTE.showCategory,
        component: ProductComponent,
        resolve: {category: CategoryComponentResolver},
        canActivate: [ValidateIdGuard],
      },
      {
        path: ROUTE.product,
        component: ProductComponent,
        resolve: {products: ProductComponentResolver},
      },
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
  
];
@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
