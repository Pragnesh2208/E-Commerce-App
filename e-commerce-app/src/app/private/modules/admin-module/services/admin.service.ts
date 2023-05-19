import {Injectable} from '@angular/core';
import {HttpClient, HttpEventType, HttpResponse} from '@angular/common/http';
import {Observable, catchError, map, throwError} from 'rxjs';

import {
  Category,
  SuccessResponse,
  Product,
} from 'src/app/shared/models/shared.model';
import {Gallery} from '../models/admin.model';

import {API} from 'src/app/shared/constants/api.constants';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private http: HttpClient) {}

  getImages(): Observable<Gallery[]> {
    return this.http.get<Gallery[]>(API.image);
  }

  addNewProduct(newProduct: Product): Observable<SuccessResponse> {
    return this.http.post<SuccessResponse>(API.addProduct, newProduct);
  }

  updateProduct(updateProduct: Product): Observable<SuccessResponse> {
    return this.http.post<SuccessResponse>(
      `${API.updateProduct}/${updateProduct.id}`,
      updateProduct,
    );
  }
  addNewCategory(newCategory: Category): Observable<SuccessResponse> {
    return this.http.post<SuccessResponse>(API.addCategory, newCategory);
  }

  updateCategory(updateCategory: Category): Observable<SuccessResponse> {
    return this.http.post<SuccessResponse>(
      `${API.updateCategory}/${updateCategory.id}`,
      updateCategory,
    );
  }

  uploadImage(imageFile: File): Observable<any> {
    let formParams = new FormData();
    formParams.append('file' , imageFile);
    return this.http.post(`${API.uploadImage}`, formParams, {
      reportProgress: true,
      observe: 'events',
      responseType: 'text',
    });
  }
}
