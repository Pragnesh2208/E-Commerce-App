import {Component} from '@angular/core';
import {Router} from '@angular/router';

import {NotificationService} from 'src/app/shared/services/notification.service';
import {AdminService} from '../../services/admin.service';

import {ROUTE, MESSAGE} from 'src/app/shared/constants/index';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { delay } from 'rxjs';

@Component({
  selector: 'app-add-image',
  templateUrl: './add-image.component.html',
  styleUrls: ['./add-image.component.scss'],
  standalone : true,
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
})
export class AddImageComponent {
  readonly routePath = ROUTE;
  file : File | null = null;

  constructor(
    private adminService: AdminService,
    private route: Router,
    private notificationService: NotificationService,
  ) {}

  selectImage(event : Event): void {
    const files = (event.target as HTMLInputElement)?.files;
    if(files)
      this.file = files[0] as File;
  }

  uploadImage(): void {
    if(this.file)
    this.adminService.uploadImage(this.file).subscribe(
      {
        next : response => {
          if (response.ok) {
            this.route.navigate([this.routePath.adminGallery]);
            this.notificationService.success(MESSAGE.addImage);
          }
        },
        error : e =>{
            this.notificationService.failed(MESSAGE.reqiredImage);
        },
        complete : () =>{
        }
      }
    );
  }
}
