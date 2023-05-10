import {CategoryProduct} from 'src/app/shared/models/shared.model';

export interface CartProduct {
  id: number;
  product: CategoryProduct;
}

export interface AddToCart {
  id: number;
  productId: number;
  quantity: number;
}

export interface CartItem extends CartProduct {
  quantity: number;
}

export interface Cart {
  cartItems: CartItem[];
  totalCost: number;
}

export interface OrderItem {
  quantity: number;
  price: number;
  createdDate: Date;
  product: CategoryProduct;
}

export interface Order {
  id: number;
  createdDate: Date;
  orderItems: OrderItem[];
  sessionId: string;
  totalPrice: number;
}

export interface ConfirmOrder {
  price: number;
  productId: number;
  productName: string;
  quantity: number;
  userId: number;
}

export interface SessionResponse {
  sessionId: string;
}
