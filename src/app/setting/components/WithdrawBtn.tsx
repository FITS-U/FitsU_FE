import { FaChevronRight } from "react-icons/fa6";

export const WithdrawBtn = () => {  
  return (
    <div className="mt-5">
      <div className="mx-[-32px] bg-contrast-800 px-8 py-6 flex items-center justify-between">
        <div className="font-semibold">탈퇴하기</div>
        <FaChevronRight />
      </div>
    </div>
  );
};