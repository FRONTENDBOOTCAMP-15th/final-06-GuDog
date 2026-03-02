"use client";

import { useEffect, useState } from "react";
import Badge from "@/components/common/Badge";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import { CameraIcon } from "@/app/(main)/mypage/_components/Icons";
import { UserInfoRes } from "@/types";
import Image from "next/image";
import { useProfile } from "@/hooks/useProfile"; // 커스텀 훅 임포트

export default function ProfileClient({ user }: { token: string; user: UserInfoRes["item"] }) {
  const {
    isPending,
    preview,
    addressInfo,
    setAddressInfo,
    handleAddressSearch,
    handleImageChange,
    handleSubmit,
    API_URL,
  } = useProfile(user);

  return (
    <main className="flex flex-col items-center pt-[75px]">
      <Badge variant="accent" aria-hidden="true">
        {"ACCOUNT EDIT"}
      </Badge>
      <h1 className="pt-[14px] text-[#1A1A1C] font-['Pretendard'] text-[26px] font-black">
        회원정보 수정
      </h1>

      <form
        className="w-full max-w-[672px] mt-10"
        onSubmit={handleSubmit}
        aria-label="회원정보 수정 폼"
      >
        <div className="mb-[161px] pr-[55px] pl-[57px] pt-[56px] pb-[70px] rounded-[49px] border border-black/[0.06] bg-[#FFF] shadow-sm">
          <div className="flex flex-col items-center mb-10">
            <div className="relative">
              <Image
                width={97}
                height={97}
                className="w-[97px] h-[97px] rounded-full object-cover  ring-2 ring-gray-100"
                src={
                  preview
                    ? preview.startsWith("http")
                      ? preview
                      : `${API_URL}${preview}`
                    : "/images/user-image.jpg"
                }
                alt="프로필 이미지"
              />
              <label
                htmlFor="profileImageUpload"
                className="absolute bottom-0 right-0 w-[30px] h-[30px] bg-[#FBA613] rounded-full flex justify-center items-center cursor-pointer border-2 border-white"
                aria-label="프로필 이미지 변경"
              >
                <CameraIcon className="text-white w-4 h-4" aria-hidden="true" />
              </label>
              <input
                type="file"
                id="profileImageUpload"
                className="hidden"
                onChange={handleImageChange}
                accept="image/*"
                aria-label="프로필 이미지 업로드"
              />
            </div>
          </div>

          <Input label="이메일 주소" value={user.email} readOnly className="mb-6 opacity-60" />

          <div className="flex flex-row gap-2 items-end mb-4">
            <Input
              label="배송 주소"
              placeholder="우편번호"
              value={addressInfo.zipcode}
              readOnly
              className="w-32"
            />
            <Button type="button" variant="primary" size="md" onClick={handleAddressSearch}>
              주소 찾기
            </Button>
          </div>

          <Input
            label=""
            placeholder="기본 주소"
            value={addressInfo.address}
            readOnly
            className="mb-2"
          />

          <Input
            label=""
            placeholder="상세 주소를 입력하세요"
            value={addressInfo.detailAddress}
            onChange={(e) => setAddressInfo((prev) => ({ ...prev, detailAddress: e.target.value }))}
            className="mb-10"
          />

          <div className="flex gap-4">
            <Button
              type="submit"
              variant="primary"
              className="flex-1"
              disabled={isPending}
              aria-label={isPending ? "정보 저장 중" : "정보 저장하기"}
            >
              {isPending ? "저장 중..." : "정보 저장하기"}
            </Button>
            {/* <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={() => window.history.back()}
              aria-label="취소하고 이전 페이지로 돌아가기"
            >
              취소
            </Button> */}
          </div>
        </div>
      </form>
    </main>
  );
}
