import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AuthGuard, ValidateIdGuard} from 'src/app/shared/guards/index';

import {GalleryComponentResolver} from './resolvers/gallery.resolver';
import {
  ProductComponentResolver,
  CategoryComponentResolver,
} from '../../../shared/resolvers';

import {ROUTE} from 'src/app/shared/constants/index';

import {
  AddImageComponent,
  AdminMenuComponent,
  GalleryComponent,
  UpdateCategoryComponent,
  UpdateProductComponent,
} from './components';
import {
  CategoryComponent,
  ProductComponent,
} from '../../../shared/components/index';
import {AdminComponent} from './admin.component';

const routes: Routes = [
  {
    path: ROUTE.admin,
    component: AdminComponent,
    children: [
      {path: '', component: AdminMenuComponent},
      {
        path: ROUTE.category,
        resolve: {categories: CategoryComponentResolver},
        component: CategoryComponent,
      },
      {
        path: `${ROUTE.category}/${ROUTE.edit}/:id`,
        component: UpdateCategoryComponent,
        resolve: {category: CategoryComponentResolver},
        canActivate: [ValidateIdGuard],
      },
      {
        path: `${ROUTE.category}/${ROUTE.add}`,
        component: UpdateCategoryComponent,
      },
      {
        path: ROUTE.gallery,
        component: GalleryComponent,
        resolve: {images: GalleryComponentResolver},
      },
      {
        path: ROUTE.product,
        component: ProductComponent,
        resolve: {products: ProductComponentResolver},
      },
      {
        path: `${ROUTE.product}/${ROUTE.edit}/:id`,
        component: UpdateProductComponent,
        resolve: {
          product: ProductComponentResolver,
          categories: CategoryComponentResolver,
        },
        canActivate: [ValidateIdGuard],
      },
      {
        path: `${ROUTE.product}/${ROUTE.add}`,
        component: UpdateProductComponent,
        resolve: {categories: CategoryComponentResolver},
      },
      {
        path: `${ROUTE.gallery}/${ROUTE.add}`,
        component: AddImageComponent,
      },
    ],
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
