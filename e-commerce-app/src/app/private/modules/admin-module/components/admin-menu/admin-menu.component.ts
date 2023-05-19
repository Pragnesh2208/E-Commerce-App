import {Component} from '@angular/core';

import {adminMenu} from '../../constants/admin.constants';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-menu',
  templateUrl: './admin-menu.component.html',
  styleUrls: ['./admin-menu.component.scss'],
  standalone : true,
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule
  ],
})
export class AdminMenuComponent {
  readonly adminMenu = adminMenu;
}
