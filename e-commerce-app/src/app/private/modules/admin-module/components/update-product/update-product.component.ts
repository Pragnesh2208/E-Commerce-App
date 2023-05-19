import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators, ReactiveFormsModule} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';

import {AdminService} from '../../services/admin.service';
import {NotificationService} from 'src/app/shared/services/notification.service';

import {PageDetail} from '../../models/admin.model';
import {Product} from 'src/app/shared/models/shared.model';

import {
  VALIDATION,
  BASE,
  ROUTE,
  MESSAGE,
} from 'src/app/shared/constants/index';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

export interface CategoryDetail {
  id: number;
  categoryName: string;
}

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.scss'],
  standalone : true,
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
})
export class UpdateProductComponent implements OnInit {
  readonly routePath = ROUTE;
  readonly validation = VALIDATION;
  readonly base = BASE;

  updateProductForm: FormGroup = this.fb.group({
    id: this.fb.control(''),
    categoryId: this.fb.control('', [Validators.required]),
    description: this.fb.control('', [Validators.required]),
    imageURL: this.fb.control('', [Validators.required]),
    name: this.fb.control('', [Validators.required]),
    price: this.fb.control('', [Validators.required]),
  });

  errorMessage: string = '';
  categoryDetails: CategoryDetail[] = [];
  isNewProduct: boolean = true;
  pageDetail!: PageDetail;

  constructor(
    private adminService: AdminService,
    private fb: FormBuilder,
    private route: Router,
    private activatedRoute: ActivatedRoute,
    private notificationService: NotificationService,
  ) {}

  ngOnInit(): void {
    this.isNewProduct = this.route.url.includes('add');
    this.pageDetail = {
      title: this.isNewProduct ? this.base.newProduct : this.base.editProduct,
    };

    this.activatedRoute.data.subscribe((response) => {
      for (let category of response['categories']) {
        const categoryDetail = {
          id: category.id,
          categoryName: category.categoryName,
        } as CategoryDetail;

        this.categoryDetails.push(categoryDetail);
      }
    });

    if (!this.isNewProduct) {
      this.activatedRoute.data.subscribe((response) => {
        this.updateProductForm.patchValue(response['product'] as Product);
      });
    }
  }

  isFieldValid(fieldName: string): boolean {
    return !!(
      this.updateProductForm.get(fieldName)?.invalid &&
      this.updateProductForm.get(fieldName)?.touched
    );
  }

  addUpdateProduct({valid}: {valid: boolean}) {
    this.updateProductForm.markAllAsTouched();

    if (valid) {
      if (this.isNewProduct) {
        this.adminService
          .addNewProduct(this.updateProductForm.value as Product)
          .subscribe(
            () => {
              this.updateProductForm.reset();
              this.route.navigate([this.routePath.adminProduct]);
              this.notificationService.success(MESSAGE.addProduct);
            },
            (e) => {
              this.notificationService.failed(e.error);
            },
          );
      } else {
        this.adminService
          .updateProduct(this.updateProductForm.value as Product)
          .subscribe(
            () => {
              this.updateProductForm.reset();
              this.route.navigate([this.routePath.adminProduct]);
              this.notificationService.success(MESSAGE.editProduct);
            },
            (e) => {
              this.notificationService.failed(e.error);
            },
          );
      }
    }
  }
}
