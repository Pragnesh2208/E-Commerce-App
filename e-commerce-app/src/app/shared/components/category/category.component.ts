import {Component, OnInit, inject} from '@angular/core';
import {Router, ActivatedRoute, RouterModule} from '@angular/router';

import {Category} from '../../models/shared.model';

import {BASE, ROUTE} from '../../constants/index';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { ECommerceDataService } from '../../services/e-commerce-data.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
  standalone: true,
  imports :[ CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule , 
    NgOptimizedImage]
  
})
export class CategoryComponent implements OnInit {
  contentDetail = {
    title: BASE.category,
    addBtn: BASE.newCategory,
    productCategoryUrl: `/${ROUTE.category}/${ROUTE.show}`,
    addBtnUrl: ROUTE.add,
    editBtnUrl: ROUTE.edit,
  };

  contentObject: Category[] =[];
  isAdmin: boolean = false;
  isDashboard: boolean = false;

    constructor(private router: Router, private activatedRoute: ActivatedRoute , private ecommerceService :ECommerceDataService ) {}

  ngOnInit(): void {
    this.isAdmin = this.router.url.includes('admin');
    this.isDashboard = !this.router.url.includes('category');
    this.activatedRoute.data.subscribe((response) => {
      this.contentObject = response['categories'];
      if (this.isDashboard) {
        this.contentDetail.title = BASE.topCategory;
        this.contentObject.splice(6);
      }
    });
  }

  checkForImage = (url : string) : string => {
    let newUrl = 'https://pin.it/3MwHvfm';
     this.ecommerceService.getImage(url).subscribe({
      next : res => {
        newUrl = url;
        return res;
      }
     }
     );

    return newUrl;
  }
}
