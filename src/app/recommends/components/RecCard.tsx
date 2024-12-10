import { getRecommendModelData } from "@/api/model";
import { Loading } from "@/components/Loading";
import { useAuthStore } from "@/store/authStore";
import { useEffect, useState } from "react";

const RecCard = () => {
  const { user, hydrateUser } = useAuthStore();
  const [loading, setLoading] = useState<boolean>(true);
  const [recData, setRecData] = useState<{ cardId: number; cardName: string; details: string; repBenefits: string }[]>([]);

  useEffect(() => {
    hydrateUser();

    const fetchCtgAndCard = async() => {
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
    fetchCtgAndCard();
  }, []);

  if (loading) return <Loading />

  return (
    <div className="mt-10">
      {recData.map((card, index) => (
        <div key={index} className="mt-8 flex flex-col items-center justify-center">
          <div className="mb-2 w-40 h-24 bg-contrast-800 rounded-lg"></div>
          <div className="space-y-1 flex flex-col items-center justify-center">
            <div className="font-bold text-lg">{card.cardName}</div>
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
      ))}
    </div>
  );  
};

export default RecCard;