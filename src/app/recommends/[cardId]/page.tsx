"use client"

import { useParams } from "next/navigation";
import Link from "next/link";

const cardDetails = [
  {
    id: 1,
    title: "IBK 무민카드",
    maindsc: "쿠팡, 카페 20%, 편의점 10% 할인",
    benefits: [
      {ctg: "교통", discRate: "200원", catDesc: "버스, 지하철"},
      {ctg: "주유", discRate: "60원", catDesc: "GS칼텍스, S-OIL, SK에너지, 현대오일뱅크"},
      {ctg: "편의점", discRate: "10%", catDesc: "GS25, CU, 세븐일레븐"},
      {ctg: "뷰티", discRate: "10%", catDesc: "올리브영"},
      {ctg: "마트", discRate: "5%", catDesc: "이마트, 홈플러스, 롯데마트"},
      {ctg: "온라인 쇼핑", discRate: "20%", catDesc: "쿠팡"},
      {ctg: "영화", discRate: "1만원", catDesc: "CGV, 롯데시네마, 메가박스"},
      {ctg: "카페", discRate: "20%", catDesc: "스타벅스, 커피빈, 카페베네, 탐엔탐스, 엔제리너스, 투썸플레이스, 할리스 등"},
      {ctg: "놀이공원", discRate: "50%", catDesc: "롯데월드, 에버랜드, 서울랜드 등"},
    ],
    annualFee: "국내전용 1만원, 해외겸용 1만2천원",
    prevSales: "50만원 이상",
    applyLink: ""
  },
  {
    id: 2,
    title: "KB 청춘대로 톡톡카드",
    maindsc: "연 최대 30만원 할인",
    benefits: [
      {ctg: "스타벅스", discRate: "60%", catDesc: "기본 50%, 간편결제 이용 시 추가 10% 할인"},
      {ctg: "패스트푸드", discRate: "20%", catDesc: "맥도날드, 버거킹, 롯데리아, 쉐이크쉑"},
      {ctg: "교통", discRate: "10%", catDesc: "버스, 지하철, 택시"},
      {ctg: "통신", discRate: "10%", catDesc: "SKT, KT, LG U+"},
      {ctg: "간편결제", discRate: "10%", catDesc: "삼성페이, 네이버페이, 카카오페이, KB국민 앱카드 등"},
    ],
    annualFee: "국내전용 1만원, 해외겸용 1만2천원",
    prevSales: "30만원 이상",
    applyLink: ""
  },
];

const CardDetailPage = () => {
  const { cardId } = useParams<{ cardId: string }>();

  const cardDetail = cardDetails.find((card) => card.id === Number(cardId));

  if (!cardDetail) {
    return <p>해당 카드를 찾을 수 없습니다.</p>;
  }

  return (
    <div className="p-8 text-white">
      <Link href="/recommends" className="text-3xl">&lt;</Link>
      <div className="mt-12 flex flex-col items-center">
        <div className="w-3/5 aspect-[5/3] bg-contrast-800 flex items-center justify-center">카드이미지</div>
      </div>
      <h1 className="text-xl font-bold mt-14">{cardDetail.title}</h1>
      <p className="text-sm mt-4">{cardDetail.maindsc}</p>
      <section className="mt-12">
        {cardDetail.benefits.map((benefits, index) => (
          <div key={index} className="mt-8">
            <span>
              <div className="text-lg font-semibold">
                <span>{benefits.ctg} </span>
                <span className="text-orange-500">{benefits.discRate} </span>
                <span>할인</span>
              </div>
              <div className="font-light text-sm/[15px] mt-1 leading-normal">{benefits.catDesc}</div>
            </span>
          </div>
        ))}
      </section>
      <div className="mt-8 mx-[-32px] flex bg-contrast-800 h-4"></div>
      <div className="mt-8">
        <h1 className="font-semibold text-lg/[17px]">안내사항</h1>
        <div className="mt-10 text-sm">
          <div>
            <span className="font-semibold">연회비&nbsp;&nbsp;</span>
            <span className="ml-[10vw]">{cardDetail.annualFee}</span>
          </div>
          <div className="mt-8">
            <span className="font-semibold">전월실적</span>
            <span className="ml-[9.5vw]">{cardDetail.prevSales}</span>
          </div>
        </div>
      </div>
      <div className="mt-10">
        <Link href={cardDetail.applyLink}>
          <button className="w-full h-16 bg-orange-500 text-black font-bold text-lg py-3 rounded-2xl">
            카드 신청하기
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CardDetailPage;
