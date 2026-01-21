import Image from "next/image";
import Link from "next/link";

export default function Products() {
  return (
    <div className="w-full bg-bg-secondary px-89 py-17.5 pb-35">
      <div className="mx-auto flex max-w-300 flex-col items-center gap-14 px-5">
        {/* 제목 */}
        <section className="flex w-290 flex-col items-center text-center">
          <h1 className="pb-5.25 text-[2.625rem]">상품 목록</h1>
          <p className="text-text-secondary">
            아이의 연령대와 건강 상태에 맞게 설계된 프리미언 영양 식단을 만나보세요.
          </p>
        </section>

        {/* 필터 태그 */}
        <nav className="flex h-15.5 w-290 items-center justify-center p-1.75">
          <div className="flex w-fit items-start self-stretch gap-2 p-1.75">
            <button
              type="button"
              className="h-10.5 w-24.75 cursor-pointer rounded-[0.875rem] border border-black/10 bg-white text-xs font-bold leading-4 text-text-tertiary"
            >
              전체보기
            </button>
            <button
              type="button"
              className="h-10.5 w-24.75 cursor-pointer rounded-[0.875rem] border border-black/10 bg-white text-xs font-bold leading-4 text-text-tertiary"
            >
              퍼피(Puppy)
            </button>
            <button
              type="button"
              className="h-10.5 w-24.75 cursor-pointer rounded-[0.875rem] border border-black/10 bg-white text-xs font-bold leading-4 text-text-tertiary"
            >
              성견(Adult)
            </button>
            <button
              type="button"
              className="h-10.5 w-24.75 cursor-pointer rounded-[0.875rem] border border-black/10 bg-white text-xs font-bold leading-4 text-text-tertiary"
            >
              시니어(Senior)
            </button>
          </div>
        </nav>

        {/* 상품 목록 그리드 */}
        <section>
          <ul className="grid grid-cols-4 gap-7">
            {[1, 2, 3, 4].map((item) => (
              <li
                key={item}
                className="flex h-100 flex-col overflow-hidden rounded-[2.1875rem] border border-black/10 bg-white"
              >
                <Link href={`/products/${item}`} className="flex w-full flex-col no-underline">
                  <div className="flex aspect-square w-full items-center justify-center bg-white">
                    <Image
                      src="/images/PUP-L-01라지퍼피 치킨앤브라운라이스 2.png"
                      alt="퍼피 치킨앤브라운라이스"
                      width={280}
                      height={280}
                      className="block h-full w-full object-contain"
                    />
                  </div>

                  <div className="flex flex-col items-start gap-2 px-4 py-4">
                    <h3 className="w-52 text-lg font-black leading-6 tracking-tight text-text-primary`">
                      퍼피 성장기 고메 A
                    </h3>
                    <p className="text-base font-black leading-6 text-text-secondary">28,000원</p>

                    <span className="inline-flex items-center rounded-md bg-orange-500/80 px-2.5 py-1 text-[0.625rem] font-normal uppercase leading-none tracking-wider text-white backdrop-blur-sm">
                      PUPPY
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* 페이지네이션 */}
        <ul className="flex w-full items-center justify-center gap-1.75 self-stretch pt-3.5 font-semibold">
          <li className="flex shrink-0 items-center justify-center">
            <button
              type="button"
              className="inline-flex h-10.5 w-10.5 cursor-not-allowed items-center justify-center rounded-[0.875rem] border border-black/10 bg-[#f2f2f2] p-0 leading-none text-[#646468]"
              disabled
            >
              ‹
            </button>
          </li>

          <li className="flex shrink-0 items-center justify-center">
            <button
              type="button"
              className="inline-flex h-10.5 w-10.5 cursor-pointer items-center justify-center rounded-[0.875rem] border border-transparent bg-[#fba613] p-0 font-semibold leading-none text-white shadow-md"
            >
              1
            </button>
          </li>

          <li className="flex shrink-0 items-center justify-center">
            <button
              type="button"
              className="inline-flex h-10.5 w-10.5 cursor-pointer items-center justify-center rounded-[0.875rem] border border-black/10 bg-white p-0 leading-none text-black"
            >
              2
            </button>
          </li>

          <li className="flex shrink-0 items-center justify-center">
            <button
              type="button"
              className="inline-flex h-10.5 w-10.5 cursor-pointer items-center justify-center rounded-[0.875rem] border border-black/10 bg-white p-0 leading-none text-black"
            >
              ›
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
