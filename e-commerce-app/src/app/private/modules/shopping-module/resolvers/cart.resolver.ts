import {Injectable} from '@angular/core';
import {catchError, EMPTY, Observable, of} from 'rxjs';
import {Resolve, Router} from '@angular/router';

import {ShoppingService} from '../services/shopping.service';
import {NotificationService} from 'src/app/shared/services/notification.service';

import {Cart} from '../models/shopping.model';
import {ROUTE} from '../../../../shared/constants/index';

@Injectable({
  providedIn: 'root',
})
export class CartResolver implements Resolve<Cart | Observable<never>> {
  constructor(
    private shoppingService: ShoppingService,
    private notificationService: NotificationService,
    private route: Router,
  ) {}

  resolve(): Observable<Cart | Observable<never>> {
    return this.shoppingService.getCart().pipe(
      catchError((e) => {
        this.notificationService.failed(e.error);
        this.route.navigate([ROUTE.dashboard]);
        return of(EMPTY);
      }),
    );
  }
}
