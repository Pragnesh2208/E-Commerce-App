import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {Order} from '../../models/shopping.model';
import {ROUTE} from 'src/app/shared/constants/index';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShoppingRoutingModule } from '../../shopping-routing.module';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
  standalone:true,
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ShoppingRoutingModule,
  ]
})
export class OrderComponent implements OnInit {
  readonly route = ROUTE;

  orders!: Order[];

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe((response) => {
      this.orders = response['orders'];
    });
  }
}
