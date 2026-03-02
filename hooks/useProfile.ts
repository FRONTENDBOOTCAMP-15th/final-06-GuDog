"use client";

import { useEffect, useState } from "react";
import { updateUser, showError, showSuccess } from "@/lib";
import { uploadFile } from "@/app/(main)/mypage/(no-layout)/order/[orderid]/review/PostReview";
import { UserInfoRes } from "@/types";

export function useProfile(user: UserInfoRes["item"]) {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const [isPending, setIsPending] = useState(false);
  const [preview, setPreview] = useState(user?.image || "");
  const [addressInfo, setAddressInfo] = useState({
    zipcode: user.extra?.zipcode || "",
    address: user.address || "",
    detailAddress: user.extra?.detailaddress || "",
  });

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const handleAddressSearch = () => {
    if (!window.daum) return;

    new window.daum.Postcode({
      oncomplete: (data: DaumPostcodeData) => {
        const roadAddr = data.roadAddress;

        let extraRoadAddr = "";

        if (data.bname !== "" && /[동|로|가]$/g.test(data.bname)) {
          extraRoadAddr += data.bname;
        }

        if (data.buildingName !== "" && data.apartment === "Y") {
          extraRoadAddr += extraRoadAddr !== "" ? `, ${data.buildingName}` : data.buildingName;
        }

        if (extraRoadAddr !== "") {
          extraRoadAddr = ` (${extraRoadAddr})`;
        }

        setAddressInfo((prev) => ({
          ...prev,
          zipcode: data.zonecode,
          address: roadAddr + extraRoadAddr,
        }));
      },
    }).open();
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("attach", file);

    try {
      setIsPending(true);
      const fileData = await uploadFile(formData);
      const serverPath = fileData.item?.[0]?.path || fileData.path || fileData.name;
      setPreview(serverPath);
    } catch (error) {
      showError("이미지 업로드에 실패했습니다.");
    } finally {
      setIsPending(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsPending(true);

    const updateData = {
      image: preview,
      address: addressInfo.address,
      extra: {
        ...user.extra,
        zipcode: addressInfo.zipcode,
        detailaddress: addressInfo.detailAddress,
      },
    };

    try {
      const result = await updateUser(user._id, updateData);
      if (result.ok) {
        showSuccess("회원 정보가 수정되었습니다.");
      } else {
        showError("수정에 실패했습니다.");
      }
    } catch (error) {
      showError("오류가 발생했습니다.");
    } finally {
      setIsPending(false);
    }
  };

  return {
    isPending,
    preview,
    addressInfo,
    setAddressInfo,
    handleAddressSearch,
    handleImageChange,
    handleSubmit,
    API_URL,
  };
}
