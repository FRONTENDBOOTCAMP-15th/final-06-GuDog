"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Product() {
  const [isLiked, setIsLiked] = useState(false);
  // 관심상품 버튼
  const [activeTab, setActiveTab] = useState<"detail" | "review" | "qna">("detail");
  // 메뉴 클릭시 해당 메뉴 스크롤
  const [isDetailExpanded, setIsDetailExpanded] = useState(false);
  // 상세 정보 더보기와 숨기기
  const [reviewPage, setReviewPage] = useState(1);
  const [qnaPage, setQnaPage] = useState(1);
  // 페이지네이션
  const totalReviewPages = 2;
  const totalQnaPages = 2;
  const [openQnaId, setOpenQnaId] = useState<number | null>(null);
  // QnA 아코디언 상태

  return (
    <main className="mx-auto w-full min-w-[360px] max-w-300 items-center px-4 pb-35 pt-17.5 sm:px-5">
      <section className="mx-auto max-w-300 px-2 pb-21 pt-10.5 sm:px-5">
        <button
          className="mb-7 inline-flex cursor-pointer items-center gap-2 border-0 bg-transparent font-semibold text-[#8b8b8f]"
          type="button"
        >
          ‹ 목록으로
        </button>

        {/* 상품이미지 */}
        <div className="mx-auto flex max-w-[75rem] flex-col items-center gap-8 lg:flex-row lg:items-start lg:gap-14">
          <div className="image-card w-full max-w-[538px] flex-shrink-0">
            <Image
              className="block w-full rounded-4xl object-cover"
              src="/images/ADT-S-01  스몰어덜트 치킨앤라이스 2.png"
              width={538}
              height={552}
              alt="어덜트 밸런스 치킨 상품 이미지"
            />
          </div>

          <div className="flex w-full flex-col items-start lg:max-w-[34rem]">
            <span className="flex items-center rounded-[0.4375rem] border border-[rgba(251,166,19,0.2)] bg-[#fff5e6] px-[0.65625rem] py-[0.21875rem] text-[0.625rem] font-extrabold uppercase leading-[0.9375rem] tracking-[0.03125rem] text-[#fba613]">
              ADULT
            </span>
            <div>
              <h1 className="mb-6 text-2xl font-bold sm:mb-12.5 sm:text-[2.625rem]">
                어덜트 밸런스 치킨
              </h1>
            </div>

            {/* 정보카드 */}
            <div className="mb-8.75 flex w-full flex-col items-start self-stretch rounded-[2.1875rem] bg-bg-secondary p-4 sm:p-7">
              <dl className="w-full">
                <div className="flex min-h-[1.5625rem] w-full items-center justify-between self-stretch py-4 sm:py-7">
                  <dt className="font-medium">판매가격</dt>
                  <dd className="text-xl font-bold sm:text-[1.625rem]">32,000원</dd>
                </div>

                <div className="my-[0.625rem] h-px bg-black/[0.06]" />

                <div className="mt-[1.3125rem] flex min-h-[1.5625rem] w-full flex-col items-start gap-1 sm:flex-row sm:items-center sm:justify-between">
                  <dt className="text-sm text-[#8b8b8f]">배송정보</dt>
                  <dd className="text-sm text-[#3a3a3c] sm:text-base">
                    무료배송 [9Dog 정기구독 시]
                  </dd>
                </div>
                <div className="mt-[1.3125rem] flex min-h-[1.5625rem] w-full items-center justify-between self-stretch">
                  <dt className="text-sm text-[#8b8b8f]">상품 정보</dt>
                  <dd className="text-[#3a3a3c]">2KG</dd>
                </div>
              </dl>
            </div>

            <p className="pb-[2.63281rem] font-['Abhaya_Libre_Medium'] text-sm font-medium leading-[1.42188rem] text-[#646468]">
              가장 신선한 원재료로 아이의 입맛과 건강을 동시에 챙기세요.
              <br />
              인공 첨가물 없이 정직하게 만들었습니다.
            </p>

            {/* 구매하기, 관심상품 */}
            <div className="flex w-full flex-row items-start gap-3.5">
              <button
                className="flex h-[3.25rem] flex-1 items-center justify-center rounded-[0.875rem] bg-[#fba613] text-white px-4 py-[1.09375rem] shadow-[0_0.5rem_2rem_0_rgba(251,166,19,0.2)] sm:px-[1.3125rem]"
                type="button"
              >
                구매하기
              </button>

              <button type="button" className="cursor-pointer" onClick={() => setIsLiked(!isLiked)}>
                <svg
                  width="81"
                  height="53"
                  viewBox="0 0 81 53"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width="81" height="52.5" rx="14" fill="white" />
                  <rect
                    x="1"
                    y="1"
                    width="79"
                    height="50.5"
                    rx="13"
                    stroke="black"
                    strokeOpacity="0.1"
                    strokeWidth="2"
                  />
                  <path
                    d="M33.7783 21.2783C33.4126 21.6439 33.1226 22.078 32.9247 22.5557C32.7268 23.0334 32.625 23.5455 32.625 24.0625C32.625 24.5796 32.7268 25.0916 32.9247 25.5694C33.1226 26.0471 33.4126 26.4812 33.7783 26.8468L40.5 33.5685L47.2218 26.8468C47.9602 26.1084 48.3751 25.1068 48.3751 24.0625C48.3751 23.0182 47.9602 22.0167 47.2218 21.2783C46.4834 20.5399 45.4818 20.125 44.4375 20.125C43.3932 20.125 42.3917 20.5399 41.6533 21.2783L40.5 22.4315L39.3468 21.2783C38.9812 20.9126 38.5471 20.6226 38.0694 20.4247C37.5916 20.2268 37.0796 20.125 36.5625 20.125C36.0455 20.125 35.5334 20.2268 35.0557 20.4247C34.578 20.6226 34.1439 20.9126 33.7783 21.2783Z"
                    fill={isLiked ? "#FF3B30" : "none"}
                    stroke={isLiked ? "#FF3B30" : "#1A1A1C"}
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 메뉴 이동 버튼 */}
      <nav className="mx-auto flex w-full max-w-[75rem] flex-col items-center border-y border-black/[0.06] bg-white/95 px-2 backdrop-blur-[12px] sm:px-5">
        <div className="flex w-full max-w-[75rem] items-start justify-center self-stretch px-0 sm:px-5">
          <button
            type="button"
            onClick={() => {
              setActiveTab("detail");
              document.getElementById("detail")?.scrollIntoView({ behavior: "smooth" });
            }}
            className={`relative flex flex-col items-center justify-center px-3 py-[1.09375rem] text-center text-[0.65rem] leading-[1.09375rem] transition-colors sm:px-[2.625rem] sm:text-[0.76875rem] ${
              activeTab === "detail"
                ? "font-black text-[#fba613]"
                : "font-bold text-[#909094] hover:text-[#fba613]"
            }`}
          >
            상세정보
            {activeTab === "detail" && (
              <div className="absolute bottom-0 h-[0.21875rem] w-[5rem] rounded-[624.9375rem] bg-[#fba613] sm:w-[7.9375rem]" />
            )}
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveTab("review");
              document.getElementById("review")?.scrollIntoView({ behavior: "smooth" });
            }}
            className={`relative flex flex-col items-center justify-center px-3 py-[1.09375rem] text-center text-[0.65rem] leading-[1.09375rem] transition-colors sm:px-[2.625rem] sm:text-[0.76875rem] ${
              activeTab === "review"
                ? "font-black text-[#fba613]"
                : "font-bold text-[#909094] hover:text-[#fba613]"
            }`}
          >
            구매후기(428)
            {activeTab === "review" && (
              <div className="absolute bottom-0 h-[0.21875rem] w-[5rem] rounded-[624.9375rem] bg-[#fba613] sm:w-[7.9375rem]" />
            )}
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveTab("qna");
              document.getElementById("qna")?.scrollIntoView({ behavior: "smooth" });
            }}
            className={`relative flex flex-col items-center justify-center px-3 py-[1.09375rem] text-center text-[0.65rem] leading-[1.09375rem] transition-colors sm:px-[2.625rem] sm:text-[0.76875rem] ${
              activeTab === "qna"
                ? "font-black text-[#fba613]"
                : "font-bold text-[#909094] hover:text-[#fba613]"
            }`}
          >
            Q&A(15)
            {activeTab === "qna" && (
              <div className="absolute bottom-0 h-[0.21875rem] w-[5rem] rounded-[624.9375rem] bg-[#fba613] sm:w-[7.9375rem]" />
            )}
          </button>
        </div>
      </nav>

      {/* 상세정보 */}
      <section id="detail" className="w-full">
        <div
          className={`relative overflow-hidden transition-all duration-500 ${
            isDetailExpanded ? "max-h-none" : "max-h-[400px]"
          }`}
        >
          <Image
            src="/images/image 27.png"
            width={1200}
            height={800}
            alt="상품 상세 이미지 1"
            className="h-auto w-full"
          />
          <Image
            src="/images/image 28.png"
            width={1200}
            height={800}
            alt="상품 상세 이미지 2"
            className="h-auto w-full"
          />
          {!isDetailExpanded && (
            <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
          )}
        </div>

        {/* 상세 더보기 */}
        <div className="flex items-center justify-center self-stretch border-y border-black/[0.06] bg-white/95 px-[2.625rem] py-[1.09375rem] backdrop-blur-[12px]">
          <button
            type="button"
            onClick={() => setIsDetailExpanded(!isDetailExpanded)}
            className="flex items-center gap-1 text-center text-[0.8125rem] font-bold leading-[17.5px] text-gray-600"
          >
            {isDetailExpanded ? "상세 접기" : "상세 더보기"}
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={`transition-transform ${isDetailExpanded ? "rotate-180" : ""}`}
            >
              <path
                d="M4.5 6.75L9 11.25L13.5 6.75"
                stroke="#909094"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </section>

      {/* 리뷰 */}
      <section
        id="review"
        className="mt-[4rem] flex flex-col gap-4 border-b border-black/[0.06] pb-[2.1875rem] sm:mt-[7rem] sm:flex-row sm:items-end sm:justify-between"
      >
        <div className="flex w-full flex-col items-start justify-end gap-[0.4375rem] pt-[2.375rem] sm:w-auto">
          <h2 className="text-xl font-black leading-[2.1875rem] tracking-[-0.09844rem] text-[#1a1a1c] sm:text-[1.96875rem]">
            구매 견주님들의 솔직 후기
          </h2>
          <div className="flex items-center">
            <span className=" text-xl font-black leading-[2.1875rem] text-[#fba613] sm:text-[1.96875rem]">
              4.8
            </span>
            <span className="flex flex-col items-start pl-[10.5px] text-sm font-bold leading-[1.3125rem] text-[#909094]">
              / 5.0
            </span>
            <svg
              className="pl-2"
              width="310"
              height="18"
              viewBox="0 0 310 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.42955 10.7025L3.12741 13.0874L4.42905 9.20866L1.11818 6.81506H5.17159L6.42955 2.93636L7.6875 6.81506H11.7409L8.43004 9.20866L9.73168 13.0874L6.42955 10.7025Z"
                fill="#FBA613"
              />
              <path
                d="M22.9295 10.7025L19.6274 13.0874L20.929 9.20866L17.6182 6.81506H21.6716L22.9295 2.93636L24.1875 6.81506H28.2409L24.93 9.20866L26.2317 13.0874L22.9295 10.7025Z"
                fill="#FBA613"
              />
              <path
                d="M39.4295 10.7025L36.1274 13.0874L37.429 9.20866L34.1182 6.81506H38.1716L39.4295 2.93636L40.6875 6.81506H44.7409L41.43 9.20866L42.7317 13.0874L39.4295 10.7025Z"
                fill="#FBA613"
              />
              <path
                d="M55.9295 10.7025L52.6274 13.0874L53.929 9.20866L50.6182 6.81506H54.6716L55.9295 2.93636L57.1875 6.81506H61.2409L57.93 9.20866L59.2317 13.0874L55.9295 10.7025Z"
                fill="#FBA613"
              />
              <path
                d="M72.4295 10.7025L69.1274 13.0874L70.429 9.20866L67.1182 6.81506H71.1716L72.4295 2.93636L73.6875 6.81506H77.7409L74.43 9.20866L75.7317 13.0874L72.4295 10.7025Z"
                fill="#FBA613"
              />
            </svg>
          </div>
        </div>
        <div className="flex items-start gap-[0.4375rem]">
          <button
            className="flex flex-col items-center justify-center rounded-[0.65625rem] border border-black/[0.06] bg-[#f9f9fb] px-[1.09375rem] py-[0.54688rem] text-center text-[0.65625rem] font-bold leading-[0.875rem] text-[#1a1a1c]"
            type="button"
          >
            최신순
          </button>
          <button
            className="flex flex-col items-center justify-center rounded-[0.65625rem] border border-[#fba613] bg-white px-[1.09375rem] py-[0.54688rem] text-center text-[0.65625rem] font-bold leading-[0.875rem] text-[#fba613]"
            type="button"
          >
            사진후기만
          </button>
        </div>
      </section>

      <section className="mt-[1.75rem]">
        <article className="mt-6 rounded-[1.5rem] border border-black/[0.06] bg-white p-4 shadow-[0_2px_12px_0_rgba(0,0,0,0.03)] sm:mt-10 sm:rounded-[2.1875rem] sm:p-7">
          <Link href="#" className="flex flex-col items-start gap-4 sm:flex-row sm:gap-6">
            <div className="h-24 w-24 flex-shrink-0 sm:h-[8.75rem] sm:w-[8.75rem]">
              <Image
                src="/images/ADT-S-01  스몰어덜트 치킨앤라이스 2.png"
                className="block h-full w-full rounded-[1.125rem] object-cover"
                width={140}
                height={140}
                alt="리뷰 상품 이미지"
              />
            </div>

            <div className="w-full flex-1">
              <div className="flex flex-wrap items-start gap-2 sm:gap-3">
                <Link href="#" className="flex flex-col gap-1 hover:opacity-80">
                  <svg
                    width="310"
                    height="18"
                    viewBox="0 0 310 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6.42955 10.7025L3.12741 13.0874L4.42905 9.20866L1.11818 6.81506H5.17159L6.42955 2.93636L7.6875 6.81506H11.7409L8.43004 9.20866L9.73168 13.0874L6.42955 10.7025Z"
                      fill="#FBA613"
                    />
                    <path
                      d="M22.9295 10.7025L19.6274 13.0874L20.929 9.20866L17.6182 6.81506H21.6716L22.9295 2.93636L24.1875 6.81506H28.2409L24.93 9.20866L26.2317 13.0874L22.9295 10.7025Z"
                      fill="#FBA613"
                    />
                    <path
                      d="M39.4295 10.7025L36.1274 13.0874L37.429 9.20866L34.1182 6.81506H38.1716L39.4295 2.93636L40.6875 6.81506H44.7409L41.43 9.20866L42.7317 13.0874L39.4295 10.7025Z"
                      fill="#FBA613"
                    />
                    <path
                      d="M55.9295 10.7025L52.6274 13.0874L53.929 9.20866L50.6182 6.81506H54.6716L55.9295 2.93636L57.1875 6.81506H61.2409L57.93 9.20866L59.2317 13.0874L55.9295 10.7025Z"
                      fill="#FBA613"
                    />
                    <path
                      d="M72.4295 10.7025L69.1274 13.0874L70.429 9.20866L67.1182 6.81506H71.1716L72.4295 2.93636L73.6875 6.81506H77.7409L74.43 9.20866L75.7317 13.0874L72.4295 10.7025Z"
                      fill="#FBA613"
                    />
                  </svg>

                  <p className="text-sm sm:text-base">우리 애가 너무 잘 먹어요!</p>
                  <p className="text-xs text-gray-500 sm:text-sm">견주사랑 | 2024.01.10</p>
                </Link>

                <div className="ml-auto self-start">
                  <button
                    type="button"
                    className="inline-flex items-center gap-1 rounded-[0.875rem] border border-black/[0.06] bg-[#f5f5f7] p-[0.4375rem] text-[0.5rem] font-bold sm:gap-2 sm:text-[0.625rem]"
                  >
                    👍 도움돼요 24
                  </button>
                </div>
              </div>

              <div className="mt-[0.625rem] text-xs font-medium leading-[1.42188rem] text-[#646468] sm:text-sm">
                <p>
                  입맛이 까다로운 편인데 이건 봉지 소리만 들려도 달려와요.성분도 착해서 안심하고
                  먹입니다.벌써 세번째 구매예요.
                </p>
              </div>
            </div>
          </Link>
        </article>

        <article className="mt-6 rounded-[1.5rem] border border-black/[0.06] bg-white p-4 shadow-[0_2px_12px_0_rgba(0,0,0,0.03)] sm:mt-10 sm:rounded-[2.1875rem] sm:p-7">
          <Link href="#" className="flex flex-col items-start gap-4 sm:flex-row sm:gap-6">
            <div className="w-full flex-1">
              <div className="flex flex-wrap items-start gap-2 sm:gap-3">
                <Link href="#" className="flex flex-col gap-1 hover:opacity-80">
                  <svg
                    width="310"
                    height="18"
                    viewBox="0 0 310 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6.42955 10.7025L3.12741 13.0874L4.42905 9.20866L1.11818 6.81506H5.17159L6.42955 2.93636L7.6875 6.81506H11.7409L8.43004 9.20866L9.73168 13.0874L6.42955 10.7025Z"
                      fill="#FBA613"
                    />
                    <path
                      d="M22.9295 10.7025L19.6274 13.0874L20.929 9.20866L17.6182 6.81506H21.6716L22.9295 2.93636L24.1875 6.81506H28.2409L24.93 9.20866L26.2317 13.0874L22.9295 10.7025Z"
                      fill="#FBA613"
                    />
                    <path
                      d="M39.4295 10.7025L36.1274 13.0874L37.429 9.20866L34.1182 6.81506H38.1716L39.4295 2.93636L40.6875 6.81506H44.7409L41.43 9.20866L42.7317 13.0874L39.4295 10.7025Z"
                      fill="#FBA613"
                    />
                    <path
                      d="M55.9295 10.7025L52.6274 13.0874L53.929 9.20866L50.6182 6.81506H54.6716L55.9295 2.93636L57.1875 6.81506H61.2409L57.93 9.20866L59.2317 13.0874L55.9295 10.7025Z"
                      fill="#FBA613"
                    />
                    <path
                      d="M72.4295 10.7025L69.1274 13.0874L70.429 9.20866L67.1182 6.81506H71.1716L72.4295 2.93636L73.6875 6.81506H77.7409L74.43 9.20866L75.7317 13.0874L72.4295 10.7025Z"
                      fill="#FBA613"
                    />
                  </svg>
                  <p className="text-sm sm:text-base">변 상태가 좋아졌어요</p>
                  <p className="text-xs sm:text-sm">초코맘 | 2024.01.08</p>
                </Link>

                <div className="ml-auto self-start">
                  <button
                    type="button"
                    className="inline-flex items-center gap-1 rounded-[0.875rem] border border-black/[0.06] bg-[#f5f5f7] p-[0.4375rem] text-[0.5rem] font-bold sm:gap-2 sm:text-[0.625rem]"
                  >
                    👍 도움돼요 12
                  </button>
                </div>
              </div>

              <div className="mt-[0.625rem] text-xs font-medium leading-[1.42188rem] text-[#646468] sm:text-sm">
                <p>
                  장이 예민해서 설사를 자주 했는데 나인독으로 바꾸고 나서 황금변을 봅니다. 다만
                  가격이 조금 있는 편이라 별 하나 뺐어요.
                </p>
              </div>
            </div>
          </Link>
        </article>
      </section>

      <ul className="flex w-full items-center justify-center gap-[0.4375rem] self-stretch pt-3.5 font-semibold">
        <li className="flex shrink-0 items-center justify-center">
          <button
            type="button"
            onClick={() => setReviewPage((prev) => Math.max(1, prev - 1))}
            className={`inline-flex h-[2.625rem] w-[2.625rem] items-center justify-center rounded-[0.875rem] border border-black/10 p-0 leading-none transition-colors ${
              reviewPage === 1
                ? "cursor-not-allowed bg-[#f2f2f2] text-[#646468]"
                : "cursor-pointer bg-white text-black hover:bg-[#fba613] hover:text-white hover:border-transparent"
            }`}
            disabled={reviewPage === 1}
          >
            ‹
          </button>
        </li>

        {Array.from({ length: totalReviewPages }, (_, i) => i + 1).map((page) => (
          <li key={page} className="flex shrink-0 items-center justify-center">
            <button
              type="button"
              onClick={() => setReviewPage(page)}
              className={`inline-flex h-[2.625rem] w-[2.625rem] cursor-pointer items-center justify-center rounded-[0.875rem] border p-0 font-semibold leading-none transition-colors ${
                reviewPage === page
                  ? "border-transparent bg-[#fba613] text-white shadow-md"
                  : "border-black/10 bg-white text-black hover:bg-[#fba613] hover:text-white hover:border-transparent"
              }`}
            >
              {page}
            </button>
          </li>
        ))}

        <li className="flex shrink-0 items-center justify-center">
          <button
            type="button"
            onClick={() => setReviewPage((prev) => Math.min(totalReviewPages, prev + 1))}
            className={`inline-flex h-[2.625rem] w-[2.625rem] items-center justify-center rounded-[0.875rem] border border-black/10 p-0 leading-none transition-colors ${
              reviewPage === totalReviewPages
                ? "cursor-not-allowed bg-[#f2f2f2] text-[#646468]"
                : "cursor-pointer bg-white text-black hover:bg-[#fba613] hover:text-white hover:border-transparent"
            }`}
            disabled={reviewPage === totalReviewPages}
          >
            ›
          </button>
        </li>
      </ul>

      {/* QnA */}
      <div id="qna" className="mx-auto mt-14 flex max-w-[75rem] flex-col gap-2.5 sm:mt-28">
        <section className="flex flex-col gap-4 border-b border-black/[0.06] pb-5 sm:flex-row sm:justify-between sm:gap-6">
          <div className="flex flex-col items-start gap-2">
            <span className="inline-flex h-7 w-fit items-center justify-center rounded-[0.625rem] bg-black/[0.06] px-3 text-xs font-bold text-[#646468]">
              QnA
            </span>
            <h2 className="m-0 text-xl font-black tracking-[-0.02em] sm:text-[2.5rem]">
              궁금한 점을 물어 보세요.
            </h2>
          </div>
          <button className="h-11 w-fit cursor-pointer self-start whitespace-nowrap rounded-[0.875rem] border-0 bg-[#fba613] px-[1.125rem] text-center text-[0.76875rem] font-bold leading-[1.09375rem] text-white shadow-[0_8px_32px_rgba(251,166,19,0.2)] sm:self-center">
            문의 작성하기
          </button>
        </section>

        <div className="flex flex-col">
          <section
            className="border-b border-black/[0.06]"
            onClick={() => setOpenQnaId(openQnaId === 2 ? null : 2)}
          >
            <button
              type="button"
              className="flex w-full flex-col gap-2 border-0 bg-transparent py-4 text-left text-inherit sm:grid sm:grid-cols-[auto_1fr_auto_auto] sm:items-center sm:gap-[18px] sm:py-[26px]"
            >
              <span className="inline-flex h-7 w-fit items-center justify-center whitespace-nowrap rounded-[0.625rem] bg-[rgba(60,220,120,0.12)] px-3 text-[0.625rem] font-bold text-[#2fa86a]">
                답변완료
              </span>
              <p className="m-0 text-sm font-extrabold tracking-[-0.01em] sm:text-lg">
                알러지 성분이 포함되어 있나요?
              </p>
              <p className="m-0 whitespace-nowrap text-xs font-semibold text-[#909094] sm:text-sm">
                댕댕이파더 | 2024.01.11
              </p>
              <span
                className={`hidden text-lg leading-none text-[#909094] transition-transform sm:block ${openQnaId === 2 ? "rotate-180" : ""}`}
              >
                <svg
                  width="32"
                  height="18"
                  viewBox="0 0 32 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <svg clip-path="url(#clip0_131_26700)">
                    <path
                      d="M27.8529 6.5625L22.7487 11.6667L17.6445 6.5625"
                      stroke="#909094"
                      stroke-width="2.1875"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  <defs>
                    <clipPath id="clip0_131_26700">
                      <rect width="17.5" height="17.5" fill="white" transform="translate(14)" />
                    </clipPath>
                  </defs>
                </svg>
              </span>
            </button>

            {/* 아코디언 메뉴바 */}
            <div
              className={`flex bg-gray-200 overflow-hidden transition-all duration-300 ${openQnaId === 2 ? "max-h-96 py-7 px-7" : "max-h-0 py-0 px-0"}`}
            >
              <svg
                className="shrink-0 pr-2"
                width="56"
                height="74"
                viewBox="0 0 56 74"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="40" height="40" rx="12" fill="#FBA613" />
                <path
                  d="M20 12 L14 28 M20 12 L26 28 M15.5 22 L24.5 22"
                  stroke="#FFF9F2"
                  strokeWidth="2.04167"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <span className="text-lg text-[#646468]">
                본 제품은 그레인프리 레시피로 설계되어 옥수수, 밀, 대두 등 주요 곡물 알러지 유발
                성분을 배제하였습니다. 상세 원재료 표를 확인 부탁드립니다.
              </span>
            </div>
          </section>

          <section className="border-b border-black/[0.06]">
            <button
              type="button"
              className="flex w-full flex-col gap-2 border-0 bg-transparent py-4 text-left text-inherit sm:grid sm:grid-cols-[auto_1fr_auto_auto] sm:items-center sm:gap-[18px] sm:py-[26px]"
            >
              <span className="flex w-fit items-center rounded-[0.4375rem] border border-black/[0.06] bg-[#f0f0f3] px-[0.65625rem] py-[0.21875rem] text-[0.625rem] font-extrabold uppercase leading-[0.9375rem] tracking-[0.03125rem] text-[#646468]">
                답변대기
              </span>
              <p className="m-0 text-sm font-extrabold tracking-[-0.01em] sm:text-lg">
                샘플 신청이 가능한가요?
              </p>
              <p className="m-0 whitespace-nowrap text-xs font-semibold text-[#909094] sm:text-sm">
                멍뭉이 | 2024.01.09
              </p>
              <span
                className={`hidden text-lg leading-none text-[#909094] transition-transform duration-300 sm:block ${openQnaId === 2 ? "rotate-180" : ""}`}
              >
                <svg
                  width="32"
                  height="18"
                  viewBox="0 0 32 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <svg clip-path="url(#clip0_131_26700)">
                    <path
                      d="M27.8529 6.5625L22.7487 11.6667L17.6445 6.5625"
                      stroke="#909094"
                      stroke-width="2.1875"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  <defs>
                    <clipPath id="clip0_131_26700">
                      <rect width="17.5" height="17.5" fill="white" transform="translate(14)" />
                    </clipPath>
                  </defs>
                </svg>
              </span>
            </button>
          </section>
        </div>

        {/* 페이지네이션 */}
        <ul className="flex w-full items-center justify-center gap-[0.4375rem] self-stretch pt-3.5 font-semibold">
          <li className="flex shrink-0 items-center justify-center">
            <button
              type="button"
              onClick={() => setQnaPage((prev) => Math.max(1, prev - 1))}
              className={`inline-flex h-[2.625rem] w-[2.625rem] items-center justify-center rounded-[0.875rem] border border-black/10 p-0 leading-none transition-colors ${
                qnaPage === 1
                  ? "cursor-not-allowed bg-[#f2f2f2] text-[#646468]"
                  : "cursor-pointer bg-white text-black hover:bg-[#fba613] hover:text-white hover:border-transparent"
              }`}
              disabled={qnaPage === 1}
            >
              ‹
            </button>
          </li>

          {Array.from({ length: totalQnaPages }, (_, i) => i + 1).map((page) => (
            <li key={page} className="flex shrink-0 items-center justify-center">
              <button
                type="button"
                onClick={() => setQnaPage(page)}
                className={`inline-flex h-[2.625rem] w-[2.625rem] cursor-pointer items-center justify-center rounded-[0.875rem] border p-0 font-semibold leading-none transition-colors ${
                  qnaPage === page
                    ? "border-transparent bg-[#fba613] text-white shadow-md"
                    : "border-black/10 bg-white text-black hover:bg-[#fba613] hover:text-white hover:border-transparent"
                }`}
              >
                {page}
              </button>
            </li>
          ))}

          <li className="flex shrink-0 items-center justify-center">
            <button
              type="button"
              onClick={() => setQnaPage((prev) => Math.min(totalQnaPages, prev + 1))}
              className={`inline-flex h-[2.625rem] w-[2.625rem] items-center justify-center rounded-[0.875rem] border border-black/10 p-0 leading-none transition-colors ${
                qnaPage === totalQnaPages
                  ? "cursor-not-allowed bg-[#f2f2f2] text-[#646468]"
                  : "cursor-pointer bg-white text-black hover:bg-[#fba613] hover:text-white hover:border-transparent"
              }`}
              disabled={qnaPage === totalQnaPages}
            >
              ›
            </button>
          </li>
        </ul>
      </div>
    </main>
  );
}
