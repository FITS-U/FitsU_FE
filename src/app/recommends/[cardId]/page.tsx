"use client"

import Link from "next/link";
import { FaChevronLeft } from "react-icons/fa";
import { useCardStore } from "@/store/cardStore";
import { useEffect, useState } from "react";
import { getCardDetails } from "@/api/card";
import { useCardDetailStore } from "@/store/cardDetailStore";
import { Loading } from "@/components/Loading";

const CardDetailPage = () => {
  const { selectedCard } = useCardStore();
  const { card, setCard } = useCardDetailStore();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCardInfo = async() => {
      try {
        const data = await getCardDetails(selectedCard.cardId);
        setCard(data);
      } catch (error) {
        console.error("Failed to fatch card details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCardInfo();
  }, [card.cardId])

  if (loading) return <Loading />

  if (!card) {
    return <p>해당 카드를 찾을 수 없습니다.</p>;
  }

  return (
    <div className="p-8 text-white relative">
      <Link href="/recommends" className="text-3xl">
        <FaChevronLeft className="h-5" />
      </Link>
      <div className="mt-12 flex flex-col items-center">
        <div className="w-3/5 aspect-[5/3] bg-contrast-800 flex items-center justify-center">카드이미지</div>
      </div>
      <h1 className="text-xl font-bold mt-14">{card.cardName}</h1>
      <section className="mt-12">
        {card.benefits.map((benefits, index) => (
          <div key={index} className="mt-8 space-y-1">
            <div className="text-orange-500 text-xl font-bold">{benefits.categoryName}</div>
            <div className="text-lg font-semibold">{benefits.benefitTitle}</div>
            <div className="font-light text-sm leading-normal">{benefits.description}</div>
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
