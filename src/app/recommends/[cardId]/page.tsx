/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import { FaChevronLeft } from "react-icons/fa";
import { useCardStore } from "@/store/cardStore";
import { useEffect, useState } from "react";
import { getCardDetails } from "@/api/card";
import { useCardDetailStore } from "@/store/cardDetailStore";
import { Loading } from "@/components/Loading";
import { useRouter } from "next/navigation";
import { CategoryIconsTiny } from "@/icons/mapping";

const CardDetailPage = () => {
  const { selectedCard } = useCardStore();
  const { card, setCard } = useCardDetailStore();
  const [loading, setLoading] = useState<boolean>(true);
  const [imageRatio, setImageRatio] = useState<string>("landscape"); // 이미지 비율 상태
  const router = useRouter();

  useEffect(() => {
    const fetchCardInfo = async () => {
      try {
        const data = await getCardDetails(selectedCard.cardId);
        setCard(data);
      } catch (error) {
        console.error("Failed to fetch card details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCardInfo();
  }, [selectedCard.cardId, setCard]);

  const handleImageLoad = (event: React.SyntheticEvent<HTMLImageElement>) => {
    const { naturalWidth, naturalHeight } = event.currentTarget;

    // 이미지 비율 계산
    setImageRatio(naturalWidth / naturalHeight > 1 ? "landscape" : "portrait");
  };

  if (loading) return <Loading message="카드 정보를 가져오는 중이에요" />;

  if (!card) {
    return <p>해당 카드를 찾을 수 없습니다.</p>;
  }

  return (
    <div className="p-8 text-white relative">
      <div onClick={() => router.back()} className="text-3xl">
        <FaChevronLeft className="h-5" />
      </div>
      <div className="mt-12 flex flex-col items-center">
        <img
          src={card.imageUrl}
          alt={card.cardName}
          className={`rounded-md ${
            imageRatio === "landscape" ? "w-3/5 h-auto" : "w-auto h-52"
          }`}
          onLoad={handleImageLoad}
        />
      </div>
      <h1 className="text-xl font-bold mt-14">{card.cardName}</h1>
      <section className="mt-12">
        {card.benefits.map((benefits, index) => (
          <div key={index} className="mt-8 space-y-1">
            <div className="flex items-center">
              <div>{CategoryIconsTiny[benefits.categoryName as keyof typeof CategoryIconsTiny] || null}</div>
              <div className="ml-1 text-orange-500 text-xl font-bold">{benefits.categoryName}</div>
            </div>
            <div className="text-lg font-semibold">{benefits.benefitTitle}</div>
            <div className="font-light text-sm leading-normal text-contrast-200">
              {benefits.description}
            </div>
          </div>
        ))}
      </section>
      <div className="mt-8 mx-[-32px] flex bg-contrast-800 h-4"></div>
      <div className="mt-8">
        <h1 className="font-semibold text-lg/[17px]">안내사항</h1>
        <div className="mt-10 text-sm">
          <div className="flex items-center">
            <span className="w-16 font-semibold">연회비&nbsp;&nbsp;</span>
            <span className="ml-2 flex-1">{card.annualFee}</span>
          </div>
          <div className="mt-8 flex items-center">
            <span className="w-16 font-semibold">전월실적</span>
            <span className="ml-2 flex-1">{card.prevSales}</span>
          </div>
        </div>
      </div>
      <div className="mt-20">
        <div className="absolute block w-full -left-0 bottom-4 px-6">
          <Link href={card.cardApplyUrl}>
            <button className="w-full h-16 bg-orange-500 text-black font-bold text-lg py-3 rounded-2xl">
              카드 신청하기
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CardDetailPage;
