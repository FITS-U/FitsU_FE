import { useAuthStore } from "@/store/authStore";
import { useState } from "react";
import { IoExit } from "react-icons/io5";

const LogoutButton = () => {
  const [showPopup, setShowPopup] = useState(false);
  const { clearToken } = useAuthStore();

  const handleLogout = () => {
    clearToken();
    setShowPopup(false);
  };

  return (
    <div>
      {/* 로그아웃 버튼 */}
      <IoExit
        className="w-auto h-7 text-contrast-300 cursor-pointer"
        onClick={() => setShowPopup(true)}
      />

      {/* 팝업 */}
      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center text-black bg-black bg-opacity-50">
          <div className="bg-white rounded-xl shadow-lg w-80">
            <h2 className="p-6 text-center text-lg font-semibold text-black my-4">
              로그아웃 하시겠습니까?
            </h2>
            <div className="flex justify-between border-t border-gray-400 cursor-pointer font-semibold">
              <button
                className="w-1/2 border-r border-gray-400"
                onClick={() => setShowPopup(false)}
              >
                <div className="p-4">취소</div>
              </button>
              <button
                className="w-1/2 text-red-500"
                onClick={handleLogout}
              >
                로그아웃
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LogoutButton;
