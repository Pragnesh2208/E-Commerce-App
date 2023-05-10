import {Injectable} from '@angular/core';
import {Observable, catchError, EMPTY, of, mergeMap} from 'rxjs';
import {Resolve, ActivatedRouteSnapshot, Router} from '@angular/router';

import {NotificationService} from '../services/notification.service';
import {ECommerceDataService} from '../services/e-commerce-data.service';

import {Category} from '../models/shared.model';
import {ROUTE, MESSAGE} from '../constants/index';

@Injectable({providedIn: 'root'})
export class CategoryComponentResolver
  implements Resolve<Category[] | Observable<never> | Category>
{
  constructor(
    private ecd: ECommerceDataService,
    private route: Router,
    private notificationService: NotificationService,
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
  ): Observable<Category[] | Observable<never> | Category> {
    let categoryId = Number(route.params['id']);

    return this.ecd.getCategories().pipe(
      mergeMap((categories) => {
        if (categoryId && window.location.pathname.includes('category')) {
          let category = categories.find(
            (category) => category.id === categoryId,
          );
          if (category) {
            return of(category);
          } else {
            this.notificationService.failed(MESSAGE.invalidId);
            this.route.navigate([`/${ROUTE.category}`]);
            return of(EMPTY);
          }
        }
        return of(categories);
      }),
      catchError((e) => {
        this.notificationService.failed(e.error);
        this.route.navigate([ROUTE.dashboard]);
        return of(EMPTY);
      }),
    );
  }
}
