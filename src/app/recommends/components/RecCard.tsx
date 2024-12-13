import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BsFillQuestionCircleFill } from "react-icons/bs";
import { RecCardData } from "../page";
import { useCardStore } from "@/store/cardStore";

interface RecCardProps {
  recData: RecCardData[];
}

const RecCard = ({ recData } : RecCardProps) => {
  const { setSelectedCard } = useCardStore();
  const [tooltipStates, setTooltipStates] = useState<number | null>(null);
  const toggleTooltip = (index: number) => {
    setTooltipStates(tooltipStates === index ? null : index);
  };
  const router = useRouter();

  return (
    <div className="mt-8">
      {recData.map((card, index) => (
        <div 
          key={index}
          className="mt-8 flex flex-col items-center justify-center"
        >
          <div
            onClick={() => [
              router.push(`/recommends/${index + 1}`),
              setSelectedCard(card),
            ]}
          >
            <div className="relative bg-contrast-800 flex flex-col items-center justify-center px-4 py-6 rounded-2xl">
              <BsFillQuestionCircleFill
                className="absolute top-3 right-3 text-contrast-400 text-xl cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleTooltip(index);
                }}
              />
              {tooltipStates === index && (
                <div className="absolute top-10 right-2 bg-white text-black p-3 rounded-lg shadow-md z-10 w-72">
                  <p className="text-sm">
                    {card.reason}
                  </p>
                </div>
              )}
              {card.imageUrl ? (
                <Image
                  src={card.imageUrl}
                  alt={`${card.cardName} 이미지`}
                  width={180}
                  height={240}
                  className="mb-4 rounded-lg max-w-[150px] max-h-[200px] lg:max-w-[240px] lg:max-h-[180px] xl:max-w-[300px] xl:max-h-[240px]"
                  layout="intrinsic"
                  onLoad={(e) => handleImageLoad(e)}
                />
              ) : (
                <div className="mb-4 w-full h-auto bg-contrast-800 rounded-lg"></div>
              )}
              <div className="space-y-1 flex flex-col items-center justify-center">
                <div className="font-bold text-lg mb-2">{card.cardName}</div>
                <div className="flex items-center justify-center text-center">
                  {highlightAmountText(card.details)}
                </div>
                <div>{`[ ${card.repBenefits} ]`}</div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  function highlightAmountText(text: string) {
    const regex = /(약\s*\d{1,3}(,\d{3})*\s*원)/g;
    const matches = [...text.matchAll(regex)];
  
    if (matches.length === 0) return text;
  
    const result = [];
    let lastIndex = 0;
  
    matches.forEach((match, index) => {
      const [fullMatch] = match;
      const startIndex = match.index || 0;
  
      if (startIndex > lastIndex) {
        result.push(text.substring(lastIndex, startIndex));
      }
  
      result.push(
        `<span key="highlight-${index}" class="text-orange-500 font-semibold">${fullMatch}</span>`
      );
      lastIndex = startIndex + fullMatch.length;
    });
  
    if (lastIndex < text.length) {
      result.push(text.substring(lastIndex));
    }
  
    return (
      <span
        dangerouslySetInnerHTML={{
          __html: result.join(""),
        }}
      />
    );
  };

  function handleImageLoad(event: React.SyntheticEvent<HTMLImageElement>) {
    const { naturalWidth, naturalHeight } = event.currentTarget;

    const imageRatio =
      naturalWidth / naturalHeight > 1 ? "landscape" : "portrait";
    event.currentTarget.classList.toggle(
      "object-cover",
      imageRatio === "landscape"
    );
    event.currentTarget.classList.toggle(
      "object-contain",
      imageRatio === "portrait"
    );
  }
};

export default RecCard;
