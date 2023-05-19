import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CategoryComponent, ProductComponent } from 'src/app/shared/components';

@Component({
  selector: 'app-main-bg',
  templateUrl: './main-bg.component.html',
  styleUrls: ['./main-bg.component.scss'],
  standalone : true,
  imports :[CommonModule,   HttpClientModule,
    ReactiveFormsModule,CategoryComponent , ProductComponent]
})
export class MainBgComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  goToShopping(element:HTMLElement){
    element.scrollIntoView({behavior:'smooth'});
  }

}
