import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {
  ProductComponent,
  ShowProductComponent,
  CategoryComponent,
  PageNotFoundComponent,
} from 'src/app/shared/components';
import {ROUTE} from 'src/app/shared/constants';
import {ValidateIdGuard} from 'src/app/shared/guards';
import {
  ProductComponentResolver,
  CategoryComponentResolver,
} from 'src/app/shared/resolvers';
import {HomeComponent} from './home.component';

const routes: Routes = [
  {
    path: '',
    resolve: {
      categories: CategoryComponentResolver,
      products: ProductComponentResolver,
    },
    children: [
      {
        path:'',
        component: HomeComponent,
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
    ],
  },
];
@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
