import { SyncLoader } from "react-spinners";

interface LoadingProps {
  message?: string;
  size?: string;
}

export const Loading: React.FC<LoadingProps> = ({ message = "잠시만 기다려주세요", size = "text-xl"  }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center h-screen">
      <p className={`mb-4 ${size} font-semibold text-orange-500`}>{message}</p>
      <SyncLoader color="#FFC03D" />
    </div>
  );
};