import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, RouterModule} from '@angular/router';

import {Gallery} from '../../../admin-module/models/admin.model';
import {galleryDetail} from '../../constants/admin.constants';

import {NotificationService} from 'src/app/shared/services/notification.service';

import {MESSAGE} from 'src/app/shared/constants';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
  standalone : true,
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule
  ],
})
export class GalleryComponent implements OnInit {
  readonly galleryContentDetail = galleryDetail;

  contentObject!: Gallery[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private notificationService: NotificationService,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe((response) => {
      this.contentObject = response['images'];
    });
  }

  copyMessage(text: string) {
    navigator.clipboard.writeText(text);
    this.notificationService.success(MESSAGE.copyImage);
  }
}
