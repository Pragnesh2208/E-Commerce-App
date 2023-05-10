import {Injectable} from '@angular/core';
import {Observable, of, catchError, EMPTY} from 'rxjs';
import {Resolve, Route, Router} from '@angular/router';

import {NotificationService} from 'src/app/shared/services/notification.service';

import {AdminService} from '../services/admin.service';
import {Gallery} from '../models/admin.model';

import {ROUTE} from '../../../../shared/constants/index';

@Injectable({
  providedIn: 'root',
})
export class GalleryComponentResolver
  implements Resolve<Gallery[] | Observable<never>>
{
  constructor(
    private adminService: AdminService,
    private notificationService: NotificationService,
    private route: Router,
  ) {}

  resolve(): Observable<Gallery[] | Observable<never>> {
    return this.adminService.getImages().pipe(
      catchError((e) => {
        this.notificationService.failed(e.error);
        this.route.navigate([ROUTE.admin]);
        return of(EMPTY);
      }),
    );
  }
}
