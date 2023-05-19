import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, RouterModule} from '@angular/router';

import {Product} from '../../../../../shared/models/shared.model';

import {ROUTE} from 'src/app/shared/constants/index';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShoppingRoutingModule } from '../../shopping-routing.module';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss'],
  standalone:true,
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ]
})
export class WishlistComponent implements OnInit {
  readonly route = ROUTE;

  wishList!: Product[];

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe((response) => {
      this.wishList = response['wishlists'];
    });
  }
}
