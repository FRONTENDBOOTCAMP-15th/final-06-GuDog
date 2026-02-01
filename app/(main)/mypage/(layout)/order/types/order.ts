import { Product, ProductExtra, ProductImage } from "@/types/product";

export interface OrderProduct {
  _id: number;
  seller_id: number;
  name: string;
  image: ProductImage;
  price: number;
  quantity: number;
  extra?: ProductExtra;
  seller?: {
    _id: number;
    name: string;
    image: string;
  };

  size?: string | null;
  color?: string | null;
  period: string;
}

export interface Order {
  _id: number;
  user_id: number;
  products: OrderProduct[];
  state: string;
  cost: {
    products: number;
    shippingFees: number;
    discount: {
      products: number;
      shippingFees: number;
    };
    total: number;
  };
  createdAt: string;
  updatedAt: string;
  period: string;
}

export interface OrderListRes {
  ok: number;
  item: Order[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// UI 렌더링을 위해 Flatten(평탄화)된 상품 타입
export interface FlattenedOrderProduct extends OrderProduct {
  orderId: number;
  displayDate: string; // 시간 제외 날짜
}
