"use client";

import Link from "next/link";

interface MyTapButtonProps {
  content: string;
  icon: React.ReactNode;
  isActive?: boolean;
  href: string;
}

export default function MyTapButton({ content, icon, isActive = false, href }: MyTapButtonProps) {
  // 가이드에 맞춘 상태별 스타일 분기
  const containerStyle = isActive
    ? "bg-[#FBA613] text-white shadow-[0_8px_32px_0_rgba(251,166,19,0.20)]" // 활성화 시 스타일
    : "bg-white text-[#1A1A1C] shadow-[0_4px_24px_-4px_rgba(0,0,0,0.04),0_0_0_1px_rgba(0,0,0,0.02)] border-[2px] border-transparent hover:bg-gray-50";

  const iconBgStyle = isActive ? "bg-white/20" : "bg-[#FFF9F2]";

  const iconColor = isActive ? "text-white" : "text-[#FBA613]";

  return (
    <Link
      href={href}
      className={`flex flex-col items-center shrink-0 active:scale-95 transition-all
        w-[274.25px] 
        p-[28px] 
        rounded-[35px] 
        gap-[10px] 
        ${containerStyle}`}
    >
      {/* 아이콘 배경 컨테이너 (56x56 고정) */}
      <div
        className={`flex items-center justify-center w-[56px] h-[56px] shrink-0 rounded-[14px] ${iconBgStyle}`}
      >
        <div className={`${iconColor} flex items-center justify-center`}>
          {/* 아이콘 컴포넌트 내부의 svg 색상을 currentColor로 제어하기 위해 text 컬러 적용 */}
          {icon}
        </div>
      </div>

      {/* 텍스트 스타일 가이드 적용 */}
      <span
        className="
          text-center 
          
          text-[16px] 
          font-[900] 
          line-height-[25px] 
          "
      >
        {content}
      </span>
    </Link>
  );
}
