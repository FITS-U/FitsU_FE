"use client";

import { useAuthStore } from "@/store/authStore";
import { useEffect } from "react";
import { FaUserCircle, FaChevronRight } from "react-icons/fa";

const Setting = () => {
  const { user, hydrateUser } = useAuthStore();
  
  useEffect(() => {
    hydrateUser();
  }, [user.token])

  return (
    <div className="p-8 text-white">
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-start">
          <FaUserCircle className="w-12 h-auto" />
          <div className="ml-4">
            <div className="text-lg font-semibold">{user.name}</div>
            <div className="text-sm">내 정보 수정하기</div>
          </div>
        </div>
        <FaChevronRight />
      </div>
    </div>
  );
};

export default Setting;