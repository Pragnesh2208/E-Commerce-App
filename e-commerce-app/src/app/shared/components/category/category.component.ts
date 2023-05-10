import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, RouterModule} from '@angular/router';

import {Category} from '../../models/shared.model';

import {BASE, ROUTE} from '../../constants/index';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
  standalone: true,
  imports :[ CommonModule,
    ReactiveFormsModule,
    BrowserModule,
    HttpClientModule,
    RouterModule,]
  
})
export class CategoryComponent implements OnInit {
  contentDetail = {
    title: BASE.category,
    addBtn: BASE.newCategory,
    productCategoryUrl: `/${ROUTE.category}/${ROUTE.show}`,
    addBtnUrl: ROUTE.add,
    editBtnUrl: ROUTE.edit,
  };

  contentObject: Category[];
  isAdmin: boolean = false;
  isDashboard: boolean = false;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

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
}
