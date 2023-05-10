import {Injectable} from '@angular/core';
import {catchError, EMPTY, Observable, of} from 'rxjs';
import {Resolve, Router} from '@angular/router';

import {ShoppingService} from '../services/shopping.service';
import {NotificationService} from 'src/app/shared/services/notification.service';

import {Product} from '../../../../shared/models/shared.model';
import {ROUTE} from '../../../../shared/constants/index';

@Injectable({
  providedIn: 'root',
})
export class WishlistResolver
  implements Resolve<Product[] | Observable<never>>
{
  constructor(
    private shoppingService: ShoppingService,
    private notificationService: NotificationService,
    private route: Router,
  ) {}

  resolve(): Observable<Product[] | Observable<never>> {
    return this.shoppingService.getWishList().pipe(
      catchError((e) => {
        this.notificationService.failed(e.error);
        this.route.navigate([ROUTE.dashboard]);
        return of(EMPTY);
      }),
    );
  }
}
