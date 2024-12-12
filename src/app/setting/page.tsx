"use client";

import { useAuthStore } from "@/store/authStore";
import { useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { EditProfileBtn } from "./components/EditProfileBtn";
import { useRouter } from "next/navigation";
import { WithdrawBtn } from "./components/WithdrawBtn";

const Setting = () => {
  const { user, hydrateUser } = useAuthStore();
  const router = useRouter();
  
  useEffect(() => {
    hydrateUser();
  }, [hydrateUser, user.token])

  return (
    <div className="p-8 text-white">
      <div className="flex items-center">
        <FaArrowLeft className="text-2xl" onClick={() => router.back()} />
        <div className="font-semibold text-lg ml-8">설정</div>
      </div>
      <div onClick={() => router.push("/setting/edit-profile")}>
        <EditProfileBtn name={user.name} />
      </div>
      <div>
        <WithdrawBtn />
      </div>
    </div>
  );
};

export default Setting;