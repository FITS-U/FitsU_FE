import { FaCircleUser, FaChevronRight } from "react-icons/fa6";

interface MyInfoProps {
  name: string;
}

export const EditProfileBtn = ({ name } : MyInfoProps) => {
  return (
    <div className="mx-[-32px] mt-6 bg-contrast-800">
      <div className="px-8 py-4 flex items-center justify-between">
        <div className="flex items-center justify-start">
          <FaCircleUser className="w-12 h-auto text-contrast-300" />
          <div className="ml-4">
            <div className="font-semibold">{name}</div>
            <div className="text-sm">내 정보 수정하기</div>
          </div>
        </div>
        <FaChevronRight />
      </div>
    </div>
  );
};