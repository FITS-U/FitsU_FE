import { IoIosCloseCircle } from "react-icons/io";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { CardState, useCardStore } from "@/store/cardStore";
import Image from "next/image";

export const PopUp = ({
  onClose,
  adData,
}: {
  onClose: () => void;
  adData: { card_id: number; card_name: string; adCopy1: string; adCopy2: string; image_url: string }[];
}) => {
  const { setSelectedCard } = useCardStore();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageRatios, setImageRatios] = useState<Record<number, string>>({}); // 이미지 비율 저장
  const router = useRouter();

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const index = Math.round(container.scrollLeft / container.offsetWidth);
    setCurrentIndex(index);
  };

  const handleImageLoad = (event: React.SyntheticEvent<HTMLImageElement>, cardId: number) => {
    const { naturalWidth, naturalHeight } = event.currentTarget;

    // 이미지 비율 계산 및 저장
    setImageRatios((prev) => ({
      ...prev,
      [cardId]: naturalWidth / naturalHeight > 1 ? "landscape" : "portrait",
    }));
  };

  // adData 항목을 CardState로 변환하는 함수
  const convertToCardState = (ad: { card_id: number; card_name: string; adCopy1: string; adCopy2: string; image_url: string }): CardState => {
    return {
      cardId: ad.card_id,
      cardName: ad.card_name,
      benefitTitle: '', // 해당 데이터에는 benefitTitle이 없으므로 빈 문자열 사용
      categoryId: 0, // 해당 데이터에는 categoryId가 없으므로 기본값 0 사용
      imageUrl: ad.image_url
    };
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div
        className="relative w-80 h-auto bg-white text-black rounded-2xl flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <IoIosCloseCircle
          className="absolute top-3 right-3 text-gray-800 text-3xl cursor-pointer"
          onClick={onClose}
        />
        <div
          className="mt-6 flex gap-4 overflow-x-auto w-full px-4 scrollbar-hide snap-x snap-mandatory"
          onScroll={handleScroll}
        >
          {adData.map((ad, index) => (
            <div
              key={index}
              className="flex-none w-full snap-center flex flex-col justify-center items-center text-center"
            >
              <div className="font-bold text-xl mb-3">{ad.card_name}</div>
              <div className="font-semibold mb-1">{ad.adCopy1}</div>
              <div className="font-semibold mb-4">{ad.adCopy2}</div>
              <Image
                src={ad.image_url}
                alt="카드이미지"
                className={`rounded-md ${
                  imageRatios[ad.card_id] === "landscape"
                    ? "w-48 h-auto"
                    : "w-auto h-48"
                }`}
                onLoad={(e) => handleImageLoad(e, ad.card_id)}
              />
              <div 
                onClick={() => {
                  router.push(`/recommends/${index + 1}`);
                  setSelectedCard(convertToCardState(ad));
                }}
                className="text-sm font-bold text-contrast-800 border-b border-black mt-2"
              >
                자세히 보기
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center gap-2 mt-6 mb-8">
          {adData.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full ${
                index === currentIndex ? "bg-gray-800" : "bg-gray-300"
              }`}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};
