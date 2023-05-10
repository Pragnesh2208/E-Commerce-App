import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {CanActivate, Router, UrlTree} from '@angular/router';

import {ECommerceDataService} from '../services/e-commerce-data.service';
import {ROUTE} from '../constants/index';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private ecd: ECommerceDataService,
    private routeNavigator: Router,
  ) {}

  canActivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const token = this.ecd.getTokenFromLocalStorage();
    if (token !== '' && token !== null) {
      return true;
    } else {
      this.routeNavigator.navigate([ROUTE.login]);
      return false;
    }
  }
}
