import {Component, OnInit} from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private route : Router) {
    
  }
  isDashBoard : boolean;

  ngOnInit(): void {
    if(this.route.url === "/") this.isDashBoard = true;
    else this.isDashBoard = false;
  }
}
