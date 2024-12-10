"use client";

import { useAuthStore } from "@/store/authStore";
import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { FaCheck } from "react-icons/fa";
import { SubText } from "./components/SubText";
import { useBankStore } from "@/store/bankStore";
import { SubTextMini } from "./components/SubTextMini";
import { useRouter } from "next/navigation";

const PrivacyConsentPage = () => {
  const [checked, setChecked] = useState<boolean>(false);
  const router = useRouter();
  // const { user, hydrateUser } = useAuthStore();

  // useEffect(() => {
  //   hydrateUser();
  // })

  return (
    <div className="text-white relative h-screen overflow-hidden">
      <div className="overflow-y-auto scrollbar-hide max-h-[calc(100vh-70px)]">
        <div className="px-8 py-6 w-full absolute bg-black">
          <FaArrowLeft className="text-2xl" onClick={() => router.back()} />
        </div>
        <div className="p-8">
          <div className="mt-16 text-lg font-semibold">
            <p>이세연님의 계좌를</p>
            <p>확인하기 위한 동의문이에요</p>
          </div>
          <div className="mt-6 text-lg text-contrast-200 font-semibold">
            <p>가입상품 목록 전송요구 및</p>
            <p>개인신용정보 수집 &middot; 이용</p>
          </div>
          <p className="mt-1 text-xs text-contrast-200 leading-normal">
            Fits U는 「신용정보의 이용 및 보호에 관한 법률」, 「개인정보 보호법」 등 관련 법령에 따라 개인신용정보를 처리해요.
          </p>
          <SubText title="정보를 보내는 곳" description={"한국장학재단"} hasColor />
          <SubText title="정보를 받는 곳" description="FITS U" hasColor />
          <SubText title="목적" description="상세정보 전송요구를 위한 가입상품목록 조회" />
          <SubText title="종료 시점 / 보유 &middot; 이용 기간" description="상세정보 전송요구 시까지 또는 최대 7일" hasColor />
          <SubTextMini 
            title="전송요구 정보" 
            description="&bull; 은행 : 수신, 개인형IRP, 선불카드" 
          />
          <div className="mt-10 text-xs text-contrast-200 leading-normal space-y-2">
            <p>개인식별정보 및 위 전송요구정보 기재 정보를 수집 &middot; 이용해요.</p>
            <p>금융 자산 정보를 자동으로 업데이트하지 않아요.</p>
            <p>
              개인신용정보 수집 &middot; 이용에 동의하지 않을 수 있어요. 하지만 서비스 이용을 위해 동의가 꼭 필요해요. 
              동의하지 않으면 본인신용정보 통합조회, 데이터분석 서비스를 이용할 수 없어요.
            </p>
          </div>
          <div 
            className="mt-10 flex items-center justify cursor-pointer"
            onClick={() => setChecked(!checked)}
          >
            <FaCheck className={`font-bold ${checked ? "text-orange-500" : "text-contrast-200"}`} />
            <div className="ml-4 text-sm text-contrast-200">
              [필수]개인신용정보 수집 &middot; 이용 동의
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-4 w-full -left-0">
        <div className="px-6"> 
          <button
            // onClick={}
            className={`p-4 w-full x-2 text-black font-bold rounded-lg 
              ${checked ? "bg-orange-500" : "bg-contrast-400 block"}`}
          >
            동의하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrivacyConsentPage;