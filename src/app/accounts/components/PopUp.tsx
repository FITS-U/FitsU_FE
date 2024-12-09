import { IoIosCloseCircle } from "react-icons/io";
import { useState } from "react";

export const PopUp = ({ onClose }: { onClose: () => void }) => {
  const advers = [
    { cardId: 1, adCopy1: "당신의 여행 꿈이 현실로! ✈️", adCopy2: "197 원더카드 LIVING으로 항공마일리지 쌓고 여행하세요!" },
    { cardId: 2, adCopy1: "아름다움도 스마트하게! 💖", adCopy2: "KB국민 와이즈카드로 뷰티 할인과 함께 나만의 스타일을 완성해보세요!" },
    { cardId: 3, adCopy1: "쇼핑 혜택의 끝판왕! 🛍️", adCopy2: "위클리 쇼핑카드로 최대 할인 혜택을 받아보세요!" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const index = Math.round(container.scrollLeft / container.offsetWidth);
    setCurrentIndex(index);
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
          className="mt-10 flex gap-4 overflow-x-auto w-full px-4 scrollbar-hide snap-x snap-mandatory"
          onScroll={handleScroll}
        >
          {advers.map((ad, index) => (
            <div
              key={index}
              className="flex-none w-full snap-center rounded-lg p-4 text-center"
            >
              <h2 className="text-xl font-bold mb-2">{ad.adCopy1}</h2>
              <p className="text-md mb-4">{ad.adCopy2}</p>
              <div className="w-40 h-60 m-auto bg-contrast-800 rounded-md"></div>
            </div>
          ))}
        </div>
        <div className="flex justify-center gap-2 mt-2 mb-10">
          {advers.map((_, index) => (
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
