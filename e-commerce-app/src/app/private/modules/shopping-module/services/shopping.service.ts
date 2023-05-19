import {Injectable} from '@angular/core';
import {Observable, mergeMap, count, BehaviorSubject, map, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';

import {ECommerceDataService} from 'src/app/shared/services/e-commerce-data.service';

import {
  Cart,
  AddToCart,
  Order,
  ConfirmOrder,
  SessionResponse,
} from '../models/shopping.model';
import {
  Product,
  SuccessResponse,
  CategoryProduct,
} from 'src/app/shared/models/shared.model';

import {API} from '../../../../shared/constants/index';

@Injectable({
  providedIn: 'root',
})

export class ShoppingService {
  token = this.ecd.getTokenFromLocalStorage();
  cartLength = new BehaviorSubject<number>(-1);

  constructor(private http: HttpClient, private ecd: ECommerceDataService) {}

  getWishList(): Observable<Product[]> {
    const getWishlistAPI = `${API.getWishlistAPI}/${this.token}`;
    return this.http.get<Product[]>(getWishlistAPI);
  }

  getCart(): Observable<Cart> {
    const getCartAPI = `${API.getCartAPI}/?token=${this.token}`;
    return this.http.get<Cart>(getCartAPI);
  }

  getCartLength(): Observable<number> {
    if (this.token != null && this.token != '') {
      const getCartAPI = `${API.getCartAPI}/?token=${this.token}`;
      return this.http
        .get<Cart>(getCartAPI)
        .pipe(
          mergeMap((cartItems) => {
            return cartItems.cartItems;
          }),
        )
        .pipe(count());
    } else {
      return of(-1);
    }
  }

  getOrder(): Observable<Order[]> {
    const getOrderAPI = `${API.getOrderAPI}/?token=${this.token}`;
    return this.http.get<Order[]>(getOrderAPI);
  }

  deleteFromCart(id: number): Observable<SuccessResponse> {
    const deleteCartAPI = `${API.deleteCartAPI}/${id}/?token=${this.token}`;
    return this.http.delete<SuccessResponse>(deleteCartAPI);
  }

  updateFromCart(updatedCart: AddToCart): Observable<SuccessResponse> {
    this.cartLength.pipe(
      map((val) => {
        val + 1;
      }),
    );
    const updateCartAPI = `${API.updateCartAPI}/${updatedCart.id}?token=${this.token}`;
    return this.http.put<SuccessResponse>(updateCartAPI, updatedCart);
  }

  getCurrentOrder(id: number): Observable<Order> {
    const getCurrentOrderAPI = `${API.getCurrentOrderAPI}/${id}?token=${this.token}`;
    return this.http.get<Order>(getCurrentOrderAPI);
  }

  createCheckoutSession(
    confirmOrder: ConfirmOrder[],
  ): Observable<SessionResponse> {
    return this.http.post<SessionResponse>(API.createSessionAPI, confirmOrder);
  }

  confirmOrder(sessionId: string): Observable<SuccessResponse> {
    return this.http.post<SuccessResponse>(
      `${API.confirmOrderAPI}?sessionId=${sessionId}&token=${this.token}`,
      {},
    );
  }

  addToCart(cartItem: AddToCart): Observable<SuccessResponse> {
    return this.http.post<SuccessResponse>(
      `${API.addCart}?token=${this.token}`,
      cartItem,
    );
  }

  addToWishList(item: CategoryProduct): Observable<SuccessResponse> {
    return this.http.post<SuccessResponse>(
      `${API.addWishlist}?token=${this.token}`,
      item,
    );
  }
}
