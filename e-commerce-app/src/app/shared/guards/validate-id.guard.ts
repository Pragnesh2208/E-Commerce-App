import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  UrlTree,
} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ValidateIdGuard implements CanActivate {
  constructor(private routeNavigator: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const currentId = Number(route.paramMap.get('id'));
    if (Number.isInteger(currentId) && currentId > 0) {
      return true;
    } else {
      this.routeNavigator.navigate(['PageNotFound']);
      return false;
    }
  }
}
