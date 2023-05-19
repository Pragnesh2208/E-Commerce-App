import {Component} from '@angular/core';

import {ROUTE} from '../../constants/index';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss'],
  standalone: true,
  imports :[ CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,]
})
export class PageNotFoundComponent {
  readonly routePath = ROUTE;
}
