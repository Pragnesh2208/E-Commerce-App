export interface SuccessResponse {
  success: boolean;
  message: string;
  timestamp: string;
}

export interface CategoryProduct {
  id: number;
  name: string;
  description: string;
  imageURL: string;
  price: number;
}

export interface Product extends CategoryProduct {
  categoryId: number;
  categoryName?: string;
}

export interface Category {
  id: number;
  categoryName: string;
  description: string;
  imageUrl: string;
  products: CategoryProduct[];
}
