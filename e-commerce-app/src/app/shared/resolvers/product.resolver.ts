import {Observable, of, mergeMap, catchError, EMPTY} from 'rxjs';
import {Injectable} from '@angular/core';
import {Resolve, ActivatedRouteSnapshot, Router} from '@angular/router';

import {ECommerceDataService} from '../services/e-commerce-data.service';
import {NotificationService} from '../services/notification.service';

import {Product} from '../models/shared.model';
import {ROUTE, MESSAGE} from '../constants/index';

@Injectable({
  providedIn: 'root',
})
export class ProductComponentResolver
  implements Resolve<Product[] | Product | typeof EMPTY>
{
  constructor(
    private ecd: ECommerceDataService,
    private route: Router,
    private notificationService: NotificationService,
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
  ): Observable<Product[] | Observable<never> | Product> {
    let productId = route.params['id'];
    return this.ecd.getProducts().pipe(
      mergeMap((products) => {
        if (productId) {
          productId = Number(productId);
          const product = products.find(
            (product) => product.id === productId,
          );
          if (product) {
            return this.ecd.getCategories().pipe(
              mergeMap((categories) => {
                const categoryId = product.categoryId;
                product.categoryName = categories.find(
                  (category) => category.id === categoryId,
                )?.categoryName;

                return of(product);
              }),
            );
          }
          this.notificationService.failed(MESSAGE.invalidId);
          this.route.navigate([`/${ROUTE.product}`]);
          return of(EMPTY);
        }
        return of(products);
      }),

      catchError((e) => {
        this.notificationService.failed(e.error);
        this.route.navigate([ROUTE.dashboard]);
        return of(EMPTY);
      }),
    );
  }
}
