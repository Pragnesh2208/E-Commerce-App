import {Component} from '@angular/core';
import {Router} from '@angular/router';

import {NotificationService} from 'src/app/shared/services/notification.service';
import {AdminService} from '../../services/admin.service';

import {ROUTE, MESSAGE} from 'src/app/shared/constants/index';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-add-image',
  templateUrl: './add-image.component.html',
  styleUrls: ['./add-image.component.scss'],
  standalone : true,
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
})
export class AddImageComponent {
  readonly routePath = ROUTE;
  file!: File;

  constructor(
    private adminService: AdminService,
    private route: Router,
    private notificationService: NotificationService,
  ) {}

  selectImage(event: Event): void {
    this.file = (<HTMLInputElement>event.target).files[0] as File;
  }

  uploadImage(): void {
    this.adminService.uploadImage(this.file).subscribe(
      (response) => {
        if (response.ok) {
          this.route.navigate([this.routePath.adminGallery]);
          this.notificationService.success(MESSAGE.addImage);
        }
      },
      (e) => {
        this.notificationService.failed(MESSAGE.reqiredImage);
      },
    );
  }
}
