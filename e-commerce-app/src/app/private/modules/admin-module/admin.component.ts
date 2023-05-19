import { CommonModule } from '@angular/common';
import {Component} from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent, NavbarComponent } from 'src/app/shared/components';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  standalone : true,
  imports : [CommonModule ,RouterModule , NavbarComponent , FooterComponent]
})
export class AdminComponent {}
