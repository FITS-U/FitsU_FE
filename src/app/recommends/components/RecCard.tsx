import { getCardImage } from "@/api/card";
import { getRecommendModelData } from "@/api/model";
import { Loading } from "@/components/Loading";
import { useAuthStore } from "@/store/authStore";
import { useCardStore } from "@/store/cardStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface RecCardData {
  cardId: number;
  cardName: string;
  details: string;
  repBenefits: string;
  imageUrl: string;
  benefitTitle: string;
  categoryId: number;
}

const RecCard = () => {
  const { user, hydrateUser } = useAuthStore();
  const { setSelectedCard, selectedCard } = useCardStore();
  const [loading, setLoading] = useState<boolean>(true);
  const [recData, setRecData] = useState<RecCardData[]>([]);
  const router = useRouter();

  useEffect(() => {
    hydrateUser();

    const fetchRecommendCard = async() => {
      try {
        if (user.token) {
          const response = await getRecommendModelData(user.token);
          setRecData(response);
        }
      } catch (error) {
        console.error("Failed to fetch categories and cards:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRecommendCard();
  }, [selectedCard]);

  useEffect(() => {
    const fetchCardImages = async () => {
      if (recData.length > 0) { // recData가 비어있지 않으면
        try {
          const updatedRecData = await Promise.all(
            recData.map(async (card) => {
              const imageResponse = await getCardImage(card.cardId);
              return { ...card, imageUrl: imageResponse.imageUrl };
            })
          );
          setRecData(updatedRecData);
        } catch (error) {
          console.error("Failed to fetch card images:", error);
        }
      }
    };

    fetchCardImages();
  }, [recData.length]);

  if (loading) return <Loading />;

  return (
    <div className="mt-8">
      {recData.map((card, index) => (
        <div 
          key={index}
          className="mt-8 flex flex-col items-center justify-center"
        >
          <div onClick={() => [
            router.push(`/recommends/${index + 1}`),
            setSelectedCard(card)
          ]}>
            <div className="bg-contrast-800 flex flex-col items-center justify-center px-4 py-6 rounded-2xl">
              {card.imageUrl ? (
                <img
                  src={card.imageUrl}
                  alt={`${card.cardName} 이미지`}
                  className="mb-4 w-full h-auto object-cover rounded-lg max-w-[160px] max-h-[120px] lg:max-w-[200px] lg:max-h-[150px] xl:max-w-[240px] xl:max-h-[180px]"
                  onLoad={(e) => handleImageLoad(e)}
                />
              ) : (
                <div className="mb-4 w-full h-auto bg-contrast-800 rounded-lg"></div>
              )}
              <div className="space-y-1 flex flex-col items-center justify-center">
                <div className="font-bold text-lg mb-2">{card.cardName}</div>
                <div className="flex items-center justify-center text-center">
                  {card.details.split(/(\d+)/).map((segment, index) => {
                    // 숫자인 부분만 강조 처리
                    return /\d+/.test(segment) ? (
                      <span
                        key={index}
                        className="text-orange-500 font-semibold whitespace-nowrap"
                      >
                        {segment}
                      </span>
                    ) : (
                      <span key={index} className="whitespace-nowrap">
                        {segment}
                      </span>
                    );
                  })}
                </div>
                <div>{card.repBenefits}</div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  function handleImageLoad(event: React.SyntheticEvent<HTMLImageElement>) {
    const { naturalWidth, naturalHeight } = event.currentTarget;

    // 이미지 비율 계산
    const imageRatio = naturalWidth / naturalHeight > 1 ? "landscape" : "portrait";
    event.currentTarget.classList.toggle("object-cover", imageRatio === "landscape");
    event.currentTarget.classList.toggle("object-contain", imageRatio === "portrait");
  }
};

export default RecCard;
