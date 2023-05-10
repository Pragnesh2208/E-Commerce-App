import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {Component} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  standalone: true,
  imports :[ CommonModule,
    ReactiveFormsModule,
    BrowserModule,
    HttpClientModule,
    RouterModule,]
})
export class FooterComponent {
  footerList = [
    {title: 'Get to Know Us', values: ['About Us', 'Android App', 'IOS App']},
    {title: 'Connect With Us', values: ['Facebook', 'Twitter', 'Instagram']},
    {
      title: 'Make Money With Us',
      values: [
        'Sell with Us',
        'Become an Affiliate',
        'Advertise Your Products',
      ],
    },
    {
      title: 'Let Us Help You',
      values: [
        'Return Centre',
        '100% Purchase Protection',
        'Help',
        'App Download',
      ],
    },
  ];
}
