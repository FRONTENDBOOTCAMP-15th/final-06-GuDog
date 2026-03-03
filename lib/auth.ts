import { getUser } from "@/lib";

interface JwtPayload {
  _id?: string;
  id?: string;
  iat?: number;
  exp?: number;
}

export function getUserIdFromToken(token: string): string | null {
  try {
    const payloadBase64 = token.split(".")[1];
    if (!payloadBase64) return null;

    // 서버 환경에서는 Buffer 사용
    const decodedPayload = Buffer.from(payloadBase64, "base64").toString("utf-8");
    const payload: JwtPayload = JSON.parse(decodedPayload);

    return payload._id || payload.id || null;
  } catch (error) {
    console.error("토큰 파싱 실패:", error);
    return null;
  }
}

export async function getAuthenticatedUser(token: string) {
  const userId = getUserIdFromToken(token);
  if (!userId) return null;

  try {
    const res = await getUser(Number(userId));
    return "item" in res ? res.item : null;
  } catch (error) {
    console.error("User Fetch Error:", error);
    return null;
  }
}
