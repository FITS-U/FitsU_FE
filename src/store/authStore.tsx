import { create } from "zustand";

export type TitleType = "name" | "phoneNum" | "verifyNum";

interface State {
  name: string;
  phoneNum: string;
  verifyNum: string;
  token: string | null;
};

interface User {
  user: State;
  isVerified: boolean;
  setUser: (user: State) => void;
  setVerificationStatus: (status: boolean) => void;
  clearToken: () => void; // 로그아웃 시 토큰 제거
}

export const useAuthStore = create<User>((set) => ({
  user:{
    name: "",
    phoneNum: "",
    verifyNum: "",
    token: typeof window !== "undefined" ? sessionStorage.getItem("token") : null,
  },
  isVerified: false, // 초기값은 인증되지 않음
  
  setUser: (user) => {
    if (user.token) {
      sessionStorage.setItem("token", user.token);  // 토큰을 세션 스토리지에 저장
    } else {
      sessionStorage.removeItem("token");
    }
    set({ user });
  },
  
  setVerificationStatus: (status) => set({ isVerified: status }),

  clearToken: () => {
    sessionStorage.removeItem("token"); // 세션 스토리지에서 토큰 제거
    set((state) => ({
      user: {...state.user, token: null},
    }));
  },
}));
