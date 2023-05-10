import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators, ReactiveFormsModule} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';

import {AdminService} from '../../services/admin.service';
import {NotificationService} from 'src/app/shared/services/notification.service';

import {Category} from '../../../../../shared/models/shared.model';
import {PageDetail} from '../../models/admin.model';

import {
  BASE,
  ROUTE,
  VALIDATION,
  MESSAGE,
} from 'src/app/shared/constants/index';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.scss'],
  standalone : true,
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
})
export class UpdateCategoryComponent implements OnInit {
  readonly base = BASE;
  readonly routePath = ROUTE;
  readonly validation = VALIDATION;

  updateCategoryForm: FormGroup = this.fb.group({
    id: this.fb.control(''),
    categoryName: this.fb.control('', [Validators.required]),
    description: this.fb.control('', [Validators.required]),
    imageUrl: this.fb.control('', [Validators.required]),
  });

  isNewCategory: boolean = true;
  pageDetail!: PageDetail;

  constructor(
    private adminService: AdminService,
    private fb: FormBuilder,
    private route: Router,
    private activatedRoute: ActivatedRoute,
    private notificationService: NotificationService,
  ) {}

  ngOnInit(): void {
    this.isNewCategory = this.route.url.includes('add');
    this.pageDetail = {
      title: this.isNewCategory
        ? this.base.newCategory
        : this.base.editCategory,
    };

    if (!this.isNewCategory) {
      this.activatedRoute.data.subscribe((response) => {
        this.updateCategoryForm.patchValue(response['category']);
      });
    }
  }

  isFieldValid(fieldName: string): boolean {
    return !!(
      this.updateCategoryForm.get(fieldName)?.invalid &&
      this.updateCategoryForm.get(fieldName)?.touched
    );
  }

  addUpdateCategory({valid}: {valid: boolean}) {
    this.updateCategoryForm.markAllAsTouched();

    if (valid) {
      if (this.isNewCategory) {
        this.adminService
          .addNewCategory(this.updateCategoryForm.value as Category)
          .subscribe(
            () => {
              this.updateCategoryForm.reset();
              this.route.navigate([this.routePath.adminCategory]);
              this.notificationService.success(MESSAGE.addCategory);
            },
            (e) => {
              this.notificationService.failed(e.error);
            },
          );
      } else {
        this.adminService
          .updateCategory(this.updateCategoryForm.value as Category)
          .subscribe(
            () => {
              this.updateCategoryForm.reset();
              this.route.navigate([this.routePath.adminCategory]);
              this.notificationService.success(MESSAGE.editCategory);
            },
            (e) => {
              this.notificationService.failed(e.error);
            },
          );
      }
    }
  }
}
