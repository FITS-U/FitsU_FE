import CategoryLogo from "@/components/CategoryLogo";
import Link from "next/link";

const RecCard = () => {
  const ctgAndCard = [
    {ctgEng: "food", ctgKo: "식비", totalAmount: "127,900", cardId: 1, cardName: "IBK 무민카드", cardCtg: "패스트푸드", discountRate: "60%"},
    {ctgEng: "transport", ctgKo: "교통", totalAmount: "60,000", cardId: 2, cardName: "KB 청춘대로 톡톡카드", cardCtg: "대중교통", discountRate: "10%"},
    {ctgEng: "shopping", ctgKo: "쇼핑", totalAmount: "40,300", cardId: 1, cardName: "IBK 무민카드", cardCtg: "온라인 쇼핑", discountRate: "20%"}
  ]

  return (
    <div className="mt-8">
      {ctgAndCard.map((ctgAndCard, index) => (
        <div key={index}>
          <div className="mt-4 flex items-center">
            <CategoryLogo w={45} h={45} name={ctgAndCard.ctgKo} iconSrc={`/icons/${ctgAndCard.ctgEng}.png`} />
            <span className="ml-4">
              <div className="text-lg">{ctgAndCard.ctgKo} 할인 BEST</div>
              <div className="text-sm font-light">총 {ctgAndCard.totalAmount}원 썼어요</div>
            </span>
          </div>
          <Link href={`/recommends/${ctgAndCard.cardId}`}>
            <div className="border-l-4 h-16 rounded-sm ml-5 mt-4 flex items-center">
              <div className="ml-9">
                <p className="text-lg font-semibold">{ctgAndCard.cardCtg} {ctgAndCard.discountRate} 할인</p>
                <p className="text-sm font-light">{ctgAndCard.cardName}</p>
              </div>
            </div>
          </Link>
        </div>  
      ))}
    </div>
  );
};

export default RecCard;