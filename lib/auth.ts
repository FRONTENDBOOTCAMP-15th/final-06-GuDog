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
