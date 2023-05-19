import {Component, Inject, Injectable, OnInit, inject} from '@angular/core';
import {Renderer2} from '@angular/core';

import {ShoppingService} from '../../../private/modules/shopping-module/services/shopping.service';
import {ROUTE} from '../../constants';
import {ECommerceDataService} from '../../services/e-commerce-data.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

interface MenuType {
  menuName: string;
  menuUrl: string;
}

export const toggleState = {
  browserToggle: false,
  accountsToggle: false,
};

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  standalone: true,
  imports :[ CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule]
})
export class NavbarComponent implements OnInit {
  readonly routePath = ROUTE;
  cartLength !: number ;
  isLogin: boolean = false;
  browserMenu: MenuType[] = [
    {
      menuName: 'Home',
      menuUrl: ROUTE.dashboard,
    },
    {
      menuName: 'Product',
      menuUrl: `${ROUTE.product}`,
    },
    {
      menuName: 'Category',
      menuUrl: `${ROUTE.category}`,
    },
  ];
  accountsMenu: MenuType[] = [
    {
      menuName: 'Wishlist',
      menuUrl: ROUTE.wishlist,
    },
    {
      menuName: 'Admin',
      menuUrl: ROUTE.admin,
    },
    {
      menuName: 'SignOut',
      menuUrl: ROUTE.login,
    },
  ];

  stateObject = toggleState;
  shoppingService : ShoppingService = inject(ShoppingService);

  constructor(
    private renderer2: Renderer2,
    private ecd: ECommerceDataService,
  ) {}

  ngOnInit(): void {
    this.renderer2.listen('window', 'click', (event) => {
      if (
        (this.stateObject.browserToggle || this.stateObject.accountsToggle) &&
        event.target &&
        !event.target.classList.contains('browser') &&
        !event.target.classList.contains('accounts')
      ) {
        this.stateObject.browserToggle = false;
        this.stateObject.accountsToggle = false;
      }
    });

    this.shoppingService.getCartLength().subscribe((cartLength : number)  => {
      if (cartLength === -1) {
          this.cartLength = 0;
      } else {
        this.cartLength = cartLength;
      }
    });

    const token = this.ecd.getTokenFromLocalStorage();
    this.accountsMenu = this.removeLists(this.accountsMenu);

    if (token !== null && token !== '') {
      this.accountsMenu = this.addOnLogin(this.accountsMenu);
    } else {
      this.accountsMenu = this.addOnLogOut(this.accountsMenu);
    }
  }

  removeLists(list: MenuType[]): MenuType[] {
    while (list.length != 2) {
      list.pop();
    }
    return list;
  }

  addOnLogin(list: MenuType[]): MenuType[] {
    this.isLogin = true;

    list.push({
      menuName: 'SignOut',
      menuUrl: ROUTE.dashboard,
    });
    return list;
  }

  addOnLogOut(list: MenuType[]): MenuType[] {
    this.isLogin = false;

    list.push({
      menuName: 'Login',
      menuUrl: ROUTE.login,
    }),
      list.push({
        menuName: 'SignUp',
        menuUrl: ROUTE.signup,
      });
    return list;
  }

  toggle(isbrowser: boolean): void {
    if (isbrowser) {
      this.stateObject.browserToggle = !this.stateObject.browserToggle;
      this.stateObject.accountsToggle = false;
    } else {
      this.stateObject.accountsToggle = !this.stateObject.accountsToggle;
      this.stateObject.browserToggle = false;
    }
  }

  removeToken() {
    this.ecd.removetokenFromLocalStorage();
    this.accountsMenu = this.removeLists(this.accountsMenu);
    this.accountsMenu = this.addOnLogOut(this.accountsMenu);
  }
}
