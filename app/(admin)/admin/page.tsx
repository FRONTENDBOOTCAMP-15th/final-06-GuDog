"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  Package,
  AlertTriangle,
  XCircle,
  Search,
  ChevronDown,
  Filter,
  Heart,
  Pencil,
} from "lucide-react";
import { getProducts } from "@/lib/product";
import { Product } from "@/types/product";
import { Pagination } from "@/types/response";

// 통계 카드 컴포넌트
interface StatCardProps {
  label: string;
  value: number;
  icon: React.ReactNode;
  bgColor: string;
  textColor: string;
}

function StatCard({ label, value, icon, bgColor, textColor }: StatCardProps) {
  return (
    <div className="bg-white rounded-lg shadow p-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600 mb-1">{label}</p>
          <p className={`text-2xl font-semibold ${textColor}`}>{value}</p>
        </div>
        <div className={`p-3 ${bgColor} rounded-lg`}>{icon}</div>
      </div>
    </div>
  );
}

// 메인 페이지 컴포넌트
export default function ProductListPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [products, setProducts] = useState<Product[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [loading, setLoading] = useState(false);

  // 통계용 상태
  const [stats, setStats] = useState({
    total: 0,
    lowStock: 0,
    outOfStock: 0,
  });

  // 입력값 상태 (디바운스용)
  const [searchInput, setSearchInput] = useState(searchParams.get("keyword") || "");

  // URL 파라미터에서 현재 값 읽기
  const keyword = searchParams.get("keyword") || "";
  const category = searchParams.get("category") || "all";
  const page = Number(searchParams.get("page")) || 1;

  // 상품 목록 조회
  const fetchProducts = async () => {
    setLoading(true);

    const res = await getProducts({
      keyword: keyword || undefined,
      custom: category !== "all" ? { "extra.category": category } : undefined,
      page,
      limit: 10,
      sort: { createdAt: -1 },
      showSoldOut: true,
    });

    if (res.ok) {
      setProducts(res.item);
      setPagination(res.pagination);

      // 통계 계산 (전체 목록 기준으로 별도 조회 필요할 수 있음)
      const total = res.pagination.total;
      const lowStock = res.item.filter(
        (p: Product) => p.quantity - p.buyQuantity > 0 && p.quantity - p.buyQuantity <= 10,
      ).length;
      const outOfStock = res.item.filter((p: Product) => p.quantity - p.buyQuantity === 0).length;

      setStats({ total, lowStock, outOfStock });
    }

    setLoading(false);
  };

  // URL 파라미터 변경 시 데이터 조회
  useEffect(() => {
    fetchProducts();
  }, [keyword, category, page]);

  // 검색 입력 디바운스
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchInput !== keyword) {
        updateParams({ keyword: searchInput, page: "1" });
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchInput]);

  // URL 파라미터 업데이트 함수
  const updateParams = (updates: Record<string, string>) => {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(updates).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });

    router.push(`?${params.toString()}`);
  };

  // 카테고리 변경 핸들러
  const handleCategoryChange = (value: string) => {
    updateParams({ category: value === "all" ? "" : value, page: "1" });
  };

  // 페이지 변경 핸들러
  const handlePageChange = (newPage: number) => {
    updateParams({ page: String(newPage) });
  };

  // 날짜 포맷
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("ko-KR");
  };

  return (
    <>
      {/* 타이틀 */}
      <div className="mb-6">
        <div className="flex items-center mb-4">
          <div>
            <h1 className="text-3xl font-semibold text-gray-900">상품 목록</h1>
            <p className="mt-1 text-sm text-gray-600">등록된 상품을 관리하세요</p>
          </div>
        </div>
      </div>

      {/* 통계 카드 */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <StatCard
          label="전체 상품"
          value={stats.total}
          icon={<Package className="w-6 h-6 text-blue-600" />}
          bgColor="bg-blue-100"
          textColor="text-gray-900"
        />
        <StatCard
          label="재고 10개 이하"
          value={stats.lowStock}
          icon={<AlertTriangle className="w-6 h-6 text-orange-600" />}
          bgColor="bg-orange-100"
          textColor="text-orange-600"
        />
        <StatCard
          label="재고 없음"
          value={stats.outOfStock}
          icon={<XCircle className="w-6 h-6 text-red-600" />}
          bgColor="bg-red-100"
          textColor="text-red-600"
        />
      </div>

      {/* 상품 테이블 */}
      <div className="bg-white rounded-lg shadow">
        {/* 필터 영역 */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* 검색 입력 */}
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="상품명 검색..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* 카테고리 필터 */}
            <div className="relative">
              <select
                value={category}
                onChange={(e) => handleCategoryChange(e.target.value)}
                className="appearance-none px-4 py-2 pr-10 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">전체 카테고리</option>
                <option value="사료">사료</option>
                <option value="간식">간식</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            </div>

            {/* 필터 버튼 */}
            <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Filter className="w-5 h-5 mr-2 text-gray-600" />
              <span className="text-gray-700">필터</span>
            </button>
          </div>
        </div>

        {/* 테이블 */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  번호
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  상품명
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  종류
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  코드명
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  등록일
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  작업
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                    로딩 중...
                  </td>
                </tr>
              ) : products.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                    상품이 없습니다.
                  </td>
                </tr>
              ) : (
                products.map((item) => (
                  <tr key={item._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      #{item._id}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 max-w-md">
                      <div className="flex items-center">
                        <Package className="w-4 h-4 text-gray-400 mr-2 flex-shrink-0" />
                        <span className="truncate">{item.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 max-w-md">
                      <div className="flex items-center">
                        {item.extra?.category && (
                          <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-600">
                            {item.extra.category}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(item.createdAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center">
                        <Heart className="w-4 h-4 text-red-400 mr-1" />
                        {item.extra?.code || ""}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                      <button className="text-blue-600 hover:text-blue-800 inline-flex items-center px-3 py-1.5 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
                        <Pencil className="w-4 h-4 mr-1" />
                        <span>수정</span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* 페이지네이션 */}
        <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
          <p className="text-sm text-gray-500">총 {pagination?.total || 0}개의 상품</p>
          <div className="flex space-x-2">
            <button
              onClick={() => handlePageChange(page - 1)}
              disabled={page <= 1}
              className="px-3 py-1 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              이전
            </button>

            {pagination &&
              Array.from({ length: Math.min(pagination.totalPages, 5) }, (_, i) => i + 1).map(
                (pageNum) => (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={`px-3 py-1 rounded-lg text-sm ${
                      page === pageNum
                        ? "bg-blue-600 text-white hover:bg-blue-700"
                        : "border border-gray-300 text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {pageNum}
                  </button>
                ),
              )}

            <button
              onClick={() => handlePageChange(page + 1)}
              disabled={!pagination || page >= pagination.totalPages}
              className="px-3 py-1 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              다음
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
