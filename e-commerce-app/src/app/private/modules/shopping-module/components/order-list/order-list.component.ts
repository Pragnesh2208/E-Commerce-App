import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {Order} from '../../models/shopping.model';
import {ROUTE} from 'src/app/shared/constants/index';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShoppingRoutingModule } from '../../shopping-routing.module';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss'],
  standalone:true,
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ShoppingRoutingModule,
  ]
})
export class OrderListComponent implements OnInit {
  readonly routePath = ROUTE;

  orderList!: Order;
  currentOrderId!: number;

  constructor(private activeRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activeRoute.data.subscribe((response) => {
      this.orderList = response['orderList'];
    });
  }
}
