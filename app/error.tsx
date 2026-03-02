"use client";

import Image from "next/image";
import "./globals.css";
import Button from "@/components/common/Button";

export default function Error() {
  return (
    <div className="bg-bg-secondary min-h-screen flex items-center justify-center py-20 px-6 overflow-hidden relative">
      {/* 배경 장식 요소 */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-accent-soft rounded-full blur-[120px] opacity-60"></div>
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-blue-50 rounded-full blur-[120px] opacity-40"></div>

      <div className="container-custom max-w-[700px] text-center relative z-10">
        <div className="space-y-8">
          <div className="relative w-64 h-64 md:w-110 md:h-110 mx-auto flex items-center justify-center">
            <Image
              src="/images/error-dog.svg"
              alt="에러 일러스트레이션"
              width={440}
              height={440}
              className="w-64 h-64 md:w-110 md:h-110"
              unoptimized
            />
          </div>

          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-black text-text-primary tracking-tight">
              문제가 발생했습니다
            </h2>
            <p className="text-lg md:text-xl text-text-secondary font-medium max-w-lg mx-auto">
              일시적인 오류가 발생했습니다. 다시 시도해주세요.
            </p>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" href="/">
              메인으로 돌아가기
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
