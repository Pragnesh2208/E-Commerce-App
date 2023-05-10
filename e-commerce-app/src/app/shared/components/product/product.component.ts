import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterModule} from '@angular/router';

import {Product} from '../../models/shared.model';
import {BASE, ROUTE} from '../../constants/index';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  standalone: true,
  imports :[ CommonModule,
    ReactiveFormsModule,
    BrowserModule,
    HttpClientModule,
    RouterModule,]
})
export class ProductComponent implements OnInit {
  contentDetail = {
    title: BASE.product,
    addBtn: BASE.newProduct,
    productCategoryUrl: `/${ROUTE.product}/${ROUTE.show}`,
    addBtnUrl: ROUTE.add,
    editBtnUrl: ROUTE.edit,
  };

  contentObject: Product[] = [];
  productId: number = 0;
  isDashboard: boolean = false;
  isAdmin: boolean = true;
  isProductCategory: boolean = false;

  constructor(private activatedRoute: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.productId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.isProductCategory = this.productId ? true : false;
    this.isAdmin = this.router.url.includes('admin');
    this.isDashboard = !this.router.url.includes('product');
    console.log(this.isAdmin);
    if (this.isProductCategory) {
      this.activatedRoute.data.subscribe((response) => {
        this.contentObject = response['category']['products'];
        this.contentDetail.title = response['category']['categoryName'];
      });
    } else {
      this.activatedRoute.data.subscribe((response) => {
        this.contentObject = response['products'];
        if (this.isDashboard) {
          this.contentDetail.title = BASE.topProduct;
          this.contentObject.splice(8);
        }
      });
    }
  }
}
