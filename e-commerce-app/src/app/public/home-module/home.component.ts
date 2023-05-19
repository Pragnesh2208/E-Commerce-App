import { CommonModule } from '@angular/common';
import {Component, OnInit} from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { HomeRoutingModule } from './home-routing.module';
import { FooterComponent, NavbarComponent } from 'src/app/shared/components';
import { MainBgComponent } from './components/main-bg/main-bg.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone : true,
  imports : [CommonModule,HomeRoutingModule , NavbarComponent , FooterComponent ,MainBgComponent ]
})
export class HomeComponent implements OnInit {
  constructor(private route : Router) {
  }
  isDashBoard : boolean = false;

  ngOnInit(): void {
    if(this.route.url === "/") this.isDashBoard = true;
    else this.isDashBoard = false;
  }
}
