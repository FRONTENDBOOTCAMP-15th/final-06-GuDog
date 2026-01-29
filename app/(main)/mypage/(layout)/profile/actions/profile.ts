"use server";

import { ErrorRes, PostInfoRes } from "@/types/response";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID || "";

type ActionState = PostInfoRes | ErrorRes | null;

// 파일 업로드

export async function uploadFiles(
  prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const accessToken = formData.get("accessToken") as string;
  const postType = formData.get("type") as string;

  // 보안을 위해 토큰을 본문에서 삭제
  formData.delete("accessToken");

  let res: Response;

  try {
    res = await fetch(`${API_URL}/posts`, {
      method: "POST",
      headers: {
        // "Content-Type": "application/json",
        "Client-Id": CLIENT_ID,
        Authorization: `Bearer ${accessToken}`,
      },
      body: formData,
    });

    const data: PostInfoRes | ErrorRes = await res.json();

    if (res.ok && data.ok === 1) {
      revalidatePath("/mypage/profile");
      return data as PostInfoRes;
    } else {
      // 실패 시 서버에서 온 ErrorRes(ok, message, errors)를 그대로 반환
      return data as ErrorRes;
    }
  } catch (error) {
    console.error(error);
    return { ok: 0, message: "네트워크 에러 발생" }; // 최소한의 에러 객체 반환
  }
}
