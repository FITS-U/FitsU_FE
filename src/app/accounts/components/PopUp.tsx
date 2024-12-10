import { IoIosCloseCircle } from "react-icons/io";
import { useState } from "react";

export const PopUp = ({
  onClose,
  adData,
}: {
  onClose: () => void;
  adData: { card_id: number; adCopy1: string; adCopy2: string; image_url: string }[];
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageRatios, setImageRatios] = useState<Record<number, string>>({}); // 이미지 비율 저장

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
          {adData.map((ad) => (
            <div
              key={ad.card_id}
              className="flex-none w-full snap-center p-4 flex flex-col justify-center items-center"
            >
              <h2 className="text-xl font-bold mb-2">{ad.adCopy1}</h2>
              <p className="text-md mb-4">{ad.adCopy2}</p>
              <img
                src={ad.image_url}
                alt="카드이미지"
                className={`rounded-md ${
                  imageRatios[ad.card_id] === "landscape"
                    ? "w-60 h-auto"
                    : "w-auto h-60"
                }`}
                onLoad={(e) => handleImageLoad(e, ad.card_id)}
              />
            </div>
          ))}
        </div>
        <div className="flex justify-center gap-2 mt-2 mb-10">
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
