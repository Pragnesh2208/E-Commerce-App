import {Injectable} from '@angular/core';
import {catchError, EMPTY, Observable, of} from 'rxjs';
import {Resolve, ActivatedRouteSnapshot, Router} from '@angular/router';

import {ShoppingService} from '../services/shopping.service';
import {NotificationService} from 'src/app/shared/services/notification.service';

import {Order} from '../models/shopping.model';
import {ROUTE} from '../../../../shared/constants/index';

@Injectable({
  providedIn: 'root',
})
export class OrderListResolver implements Resolve<Order | Observable<never>> {
  constructor(
    private shoppingService: ShoppingService,
    private notificationService: NotificationService,
    private route: Router,
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
  ): Observable<Order | Observable<never>> {
    const OrderId = Number(route.params['id']);
    return this.shoppingService.getCurrentOrder(OrderId).pipe(
      catchError((e) => {
        this.notificationService.failed(e.error);
        this.route.navigate([ROUTE.order]);
        return of(EMPTY);
      }),
    );
  }
}
