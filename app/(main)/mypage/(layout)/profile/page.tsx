import { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import ProfileClient from "@/actions/profile";
import { getUser } from "@/lib";
import { getUserIdFromToken } from "@/lib/auth";

export const metadata: Metadata = {
  title: "회원 정보",
  description: "9DOG 회원 정보 페이지입니다.",
};

export default async function ProfilePage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  if (!token) redirect("/login");

  // 토큰 전용 유틸리티 함수 사용
  const userId = getUserIdFromToken(token);
  if (!userId) redirect("/login");

  // .catch()로 try/catch 없이 const로 할당
  const res = await getUser(Number(userId)).catch((err) => {
    console.error("데이터 로드 중 에러:", err);
    return null;
  });

  const userData = res && "item" in res ? res.item : null;

  if (!userData) {
    return (
      <main className="flex flex-col items-center pt-20">
        <div role="alert" aria-live="assertive">
          <p>사용자 정보를 불러올 수 없습니다.</p>
        </div>
        <Link href="/login" className="mt-4 text-orange-500 underline">
          다시 로그인하기
        </Link>
      </main>
    );
  }

  return <ProfileClient token={token} user={userData} />;
}
