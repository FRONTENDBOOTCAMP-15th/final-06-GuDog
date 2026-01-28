import { ErrorRes, ProductListRes } from "@/types/response";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID || "";

interface GetProductsOptions {
  minPrice?: number;
  maxPrice?: number;
  minShippingFees?: number;
  maxShippingFees?: number;
  keyword?: string;
  seller_id?: number;
  custom?: Record<string, unknown>;
  page?: number;
  limit?: number;
  sort?: Record<string, 1 | -1>;
  showSoldOut?: boolean;
}

/**
 * 상품 목록 조회
 * @param {GetProductsOptions} [options] - 조회 옵션
 * @param {number} [options.minPrice] - 최저 가격 (기본값: 0)
 * @param {number} [options.maxPrice] - 최고 가격 (기본값: 99999999999)
 * @param {number} [options.minShippingFees] - 최저 배송비 (기본값: 0)
 * @param {number} [options.maxShippingFees] - 최고 배송비 (기본값: 99999999999)
 * @param {string} [options.keyword] - 상품명 검색어
 * @param {number} [options.seller_id] - 판매자 id
 * @param {Record<string, unknown>} [options.custom] - custom 검색 조건 (MongoDB 쿼리)
 * @param {number} [options.page] - 페이지 번호
 * @param {number} [options.limit] - 한 페이지당 항목 수 (미지정시 최대 100개)
 * @param {Record<string, 1 | -1>} [options.sort] - 정렬 조건 (예: { price: -1 })
 * @param {boolean} [options.showSoldOut] - 매진 상품 포함 여부
 * @returns {Promise<ProductListRes | ErrorRes>} - 상품 목록 응답 객체
 * @example
 * // 전체 조회
 * getProducts();
 *
 * // 가격 필터 + 정렬
 * getProducts({ minPrice: 10000, maxPrice: 50000, sort: { price: -1 } });
 *
 * // 신상품만 조회
 * getProducts({ custom: { 'extra.isNew': true }, limit: 10 });
 */
export async function getProducts(
  options?: GetProductsOptions,
): Promise<ProductListRes | ErrorRes> {
  try {
    const params = new URLSearchParams();

    if (options) {
      const {
        minPrice,
        maxPrice,
        minShippingFees,
        maxShippingFees,
        keyword,
        seller_id,
        custom,
        page,
        limit,
        sort,
        showSoldOut,
      } = options;

      if (minPrice !== undefined) params.append("minPrice", String(minPrice));
      if (maxPrice !== undefined) params.append("maxPrice", String(maxPrice));
      if (minShippingFees !== undefined) params.append("minShippingFees", String(minShippingFees));
      if (maxShippingFees !== undefined) params.append("maxShippingFees", String(maxShippingFees));
      if (keyword) params.append("keyword", keyword);
      if (seller_id !== undefined) params.append("seller_id", String(seller_id));
      if (custom) params.append("custom", JSON.stringify(custom));
      if (page !== undefined) params.append("page", String(page));
      if (limit !== undefined) params.append("limit", String(limit));
      if (sort) params.append("sort", JSON.stringify(sort));
      if (showSoldOut !== undefined) params.append("showSoldOut", String(showSoldOut));
    }

    const queryString = params.toString();
    const url = queryString ? `${API_URL}/products?${queryString}` : `${API_URL}/products`;

    const res = await fetch(url, {
      headers: {
        "Client-Id": CLIENT_ID,
      },
    });
    return res.json();
  } catch (error) {
    console.error(error);
    return { ok: 0, message: "일시적인 네트워크 문제로 상품 목록 조회에 실패했습니다." };
  }
}
