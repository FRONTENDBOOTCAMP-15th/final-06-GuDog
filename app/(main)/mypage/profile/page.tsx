import { SubscriptionIcon, PurchaseIcon, HeartIcon, UserIcon } from "@/components/common/Icons";
import Pagetag from "@/components/common/PageTag";

export default function Profile() {
  return (
    <>
      <div className="flex flex-col items-center pt-[75px] ">
        <p className=" rounded-[7px] border border-[#FBA613]/20 bg-[#FFF5E6] w-[102px] h-[24px] leading-5 text-center text-[#FBA613] font-['Pretendard'] font-[800] text-[10px]">
          ACCOUNT EDIT
        </p>
        <h1 className="pt-[14px] text-[#1A1A1C] font-['Pretendard'] text-[26px] font-black">
          회원정보 수정
        </h1>
        <p className="pt-[14px] pb-[42px] text-[#646468] font-['Pretendard'] text-[14px] font-[500]">
          서비스 이용을 위한 소중한 정보를 안전하게 관리하세요.
        </p>

        <form className=" w-[672px] h-[779px] pl-[56px] pr-[56px] pt-[56px] pb-[70px] rounded-[49px] border border-black/[0.06] bg-[#FFF] shadow-[0_4px_24px_-4px_rgba(0,0,0,0.04),0_0_0_1px_rgba(0,0,0,0.02)]">
          <img
            className="w-[97px] h-[97px] rounded-full ring-4 ring-white shadow-2xl"
            src="/images/프로필.png"
            alt="프로필 이미지"
          ></img>
          <p>프로필 사진 변경</p>

          {/* {이메일 주소 입력 폼} */}
          <div>
            <p className="text-[#1A1A1C] font-['Pretendard'] text-[12.3px] font-[900] leading-[17.5px]">
              이메일 주소
            </p>
            <input
              className="w-[560px] h-[53px] text-[#1A1A1C] font-['Pretendard'] text-[12.3px] font-[900] leading-[17.5px]
            rounded-[14px] border-2 border-transparent bg-[#F9F9FB]"
              placeholder="hello@9Dog.co.kr"
            ></input>
          </div>

          {/* {배송 주소 입력 폼} */}
          <div>
            <p className="text-[#1A1A1C] font-['Pretendard'] text-[12.3px] font-[900] leading-[17.5px]">
              배송 주소
            </p>
            <input
              className="w-[560px] h-[53px] text-[#1A1A1C] font-['Pretendard'] text-[12.3px] font-[900] leading-[17.5px] 
            rounded-[14px] border-2 border-transparent bg-[#F9F9FB]"
              placeholder="12345"
            ></input>
            <button
              className="w-[81px] h-[53px] text-[#1A1A1C] font-['Pretendard'] text-[12.3px] font-[900] leading-[17.5px]
            rounded-[14px] bg-[#FBA613]"
              type="button"
            >
              주소 찾기
            </button>
            <input
              className="w-[560px] h-[53px] text-[#1A1A1C] font-['Pretendard'] text-[12.3px] font-[900] leading-[17.5px]
            rounded-[14px] border-2 border-transparent bg-[#F9F9FB]"
              placeholder="서울특별시 강남구 테헤란로 1234"
            ></input>
            <input
              className="w-[560px] h-[53px] text-[#1A1A1C] font-['Pretendard'] text-[12.3px] font-[900] leading-[17.5px]
            rounded-[14px] border-2 border-transparent bg-[#F9F9FB]"
              placeholder="나인독 타워 9층"
            ></input>

            <div>
              {/* { 제출 버튼 } */}
              <button
                className="w-[270px] h-[57px] rounded-[14px] bg-[#FBA613] text-[#FFFFFF] shadow-[0_8px_32px_0_rgba(251,166,19,0.20)]"
                type="button"
              >
                정보 저장하기
              </button>
              <button
                className="w-[270px] h-[57px] rounded-[14px] border-2 border-black/10 bg-[#FFF]"
                type="button"
              >
                취소
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
