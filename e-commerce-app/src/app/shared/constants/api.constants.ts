import {environment} from '../../../environments/environment';

export const API = {
  loginAPI: `${environment.baseURL}/user/signIn`,
  signupAPI: `${environment.baseURL}/user/signup`,
  category: `${environment.baseURL}/category/`,
  product: `${environment.baseURL}/product/`,
  getWishlistAPI: `${environment.baseURL}/wishlist`,
  getCartAPI: `${environment.baseURL}/cart`,
  getOrderAPI: `${environment.baseURL}/order`,
  deleteCartAPI: `${environment.baseURL}/cart/delete`,
  updateCartAPI: `${environment.baseURL}/cart/update`,
  getCurrentOrderAPI: `${environment.baseURL}/order`,
  createSessionAPI: `${environment.baseURL}/order/create-checkout-session`,
  confirmOrderAPI: `${environment.baseURL}/order/add`,
  image: `${environment.baseURL}/fileUpload/`,
  addProduct: `${environment.baseURL}/product/add/`,
  updateProduct: `${environment.baseURL}/product/update`,
  addCategory: `${environment.baseURL}/category/create/`,
  updateCategory: `${environment.baseURL}/category/update`,
  uploadImage: `${environment.baseURL}/fileUpload/`,
  addCart: `${environment.baseURL}/cart/add`,
  addWishlist: `${environment.baseURL}/wishlist/add`,
};
