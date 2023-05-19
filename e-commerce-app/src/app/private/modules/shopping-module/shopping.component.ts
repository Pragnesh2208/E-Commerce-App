import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {Component} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShoppingRoutingModule } from './shopping-routing.module';
import { RouterModule } from '@angular/router';
import { FooterComponent, NavbarComponent } from 'src/app/shared/components';

@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.scss'],
  standalone : true,
  imports : [CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    ShoppingRoutingModule,
  NavbarComponent,
FooterComponent]
})
export class ShoppingComponent {}
