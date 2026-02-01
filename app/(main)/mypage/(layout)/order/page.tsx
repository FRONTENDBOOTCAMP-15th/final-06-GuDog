import { getOrderlist } from "./getOrderlist";
import { Product404 } from "@/app/(main)/mypage/_components/DogFoodImage";
import { Pencil } from "@/app/(main)/mypage/_components/Mark";
import MyItemList from "@/app/(main)/mypage/_components/MyItemListA";
import PaginationWrapper from "@/components/common/PaginationWrapper";
import Image from "next/image";

import {
  Order,
  OrderListRes,
  FlattenedOrderProduct,
} from "@/app/(main)/mypage/(layout)/order/types/order";

interface Props {
  searchParams: Promise<{ page?: string }>;
}

export default async function Orders({ searchParams }: Props) {
  const { page } = await searchParams;
  const currentPage = Number(page) || 1;

  const response: OrderListRes = await getOrderlist(currentPage);

  const orders: Order[] = response?.ok === 1 ? response.item : [];
  const totalPages = response?.pagination?.totalPages || 1;

  const flattenedItems: FlattenedOrderProduct[] = orders.flatMap((order: Order) =>
    order.products.map((product) => ({
      ...product,
      orderId: order._id,
      displayDate: order.createdAt.split(" ")[0],
    })),
  );

  return (
    <div className="w-full min-w-[360px] pb-[70px]">
      <div className="mt-[108px]">
        <p className="text-[#1A1A1C] text-center text-[26.3px] font-[900]">김구독님이 이용 중인</p>
        <div className="flex flex-row justify-center">
          <p className="text-[#FBA613] text-center text-[26.3px] font-[900]">주문 내역</p>
          <p className="text-[#1A1A1C] text-center text-[26.3px] font-[900]">입니다</p>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto pt-[57px] pb-[100px] px-[20px] lg:px-0">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-[20px] lg:gap-7 justify-items-center">
          {flattenedItems.map((item: FlattenedOrderProduct, index: number) => (
            <MyItemList
              key={`${item.orderId}-${item._id}-${index}`}
              orderId={String(item.orderId)}
              title={item.name}
              image={
                <div className="rounded-3xl overflow-hidden w-[211px] h-[211px] relative">
                  {item.image?.path ? (
                    <Image
                      src={item.image.path}
                      alt={item.name}
                      width={211}
                      height={211}
                      className="object-cover"
                    />
                  ) : (
                    <Product404 />
                  )}
                </div>
              }
              content="리뷰 작성"
              date={item.displayDate}
              period={item.extra?.period || "단회성 구매"}
              quantity={item.quantity}
              price={`${item.price.toLocaleString()}원`}
              mark={<Pencil />}
            />
          ))}
        </div>
      </div>
      <PaginationWrapper currentPage={currentPage} totalPages={totalPages} />
    </div>
  );
}
