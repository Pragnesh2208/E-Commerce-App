import {Injectable} from '@angular/core';
import {catchError, EMPTY, Observable, of} from 'rxjs';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
  Router,
} from '@angular/router';

import {ShoppingService} from '../services/shopping.service';
import {NotificationService} from 'src/app/shared/services/notification.service';

import {Order} from '../models/shopping.model';
import {ROUTE} from '../../../../shared/constants/index';

@Injectable({
  providedIn: 'root',
})
export class OrderResolver implements Resolve<Order[] | Observable<never>> {
  constructor(
    private shoppingService: ShoppingService,
    private notificationService: NotificationService,
    private route: Router,
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<Order[] | Observable<never>> {
    return this.shoppingService.getOrder().pipe(
      catchError((e) => {
        this.notificationService.failed(e.error);
        this.route.navigate([ROUTE.dashboard]);
        return of(EMPTY);
      }),
    );
  }
}
