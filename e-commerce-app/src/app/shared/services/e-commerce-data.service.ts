import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

import {Category, Product} from '../models/shared.model';
import {API} from '../constants/index';

@Injectable({
  providedIn: 'root',
})
export class ECommerceDataService {
  token: string = '';
  constructor(private http: HttpClient) {}

  getTokenFromLocalStorage() {
    if (this.token !== '' && this.token !== null) {
      return this.token;
    }
    const tempToken = localStorage.getItem('token');
    this.token = tempToken ? tempToken : " ";
    return this.token;
  }

  removetokenFromLocalStorage() {
    this.token = '';
    localStorage.removeItem('token');
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(API.category);
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(API.product);
  }
}
