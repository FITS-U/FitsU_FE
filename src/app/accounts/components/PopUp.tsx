import { IoIosCloseCircle } from "react-icons/io";
import { useState } from "react";

export const PopUp = ({
  onClose, adData, loading 
} : { 
  onClose: () => void;
  adData: { cardId: number; adCopy1: string; adCopy2: string }[];
  loading: boolean; 
}) => {
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
          {adData.map((ad, index) => (
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
