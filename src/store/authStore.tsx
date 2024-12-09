import { create } from "zustand";

export type TitleType = "name" | "phoneNum" | "verifyNum";

interface State {
  name: string;
  phoneNum: string;
  verifyNum: string;
  token: string | null;
}

interface User {
  user: State;
  isVerified: boolean;
  setUser: (user: State) => void;
  setVerificationStatus: (status: boolean) => void;
  clearToken: () => void; // 로그아웃 시 토큰 제거
  hydrateUser: () => void;
}

const SESSION_KEY = "authUser";

export const useAuthStore = create<User>((set) => ({
  user: { name: "", phoneNum: "", verifyNum: "", token: null }, // 기본값
  isVerified: false,

  setUser: (user) => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(user));
    }
    set({ user });
  },

  setVerificationStatus: (status) => set({ isVerified: status }),

  clearToken: () => {
    if (typeof window !== "undefined") {
      sessionStorage.removeItem(SESSION_KEY);
    }
    set((state) => ({
      user: { ...state.user, token: null, name: "", phoneNum: "", verifyNum: "" },
    }));
  },

  // 클라이언트에서 세션 정보를 초기화
  hydrateUser: () => {
    if (typeof window !== "undefined") {
      const savedUser = sessionStorage.getItem(SESSION_KEY);
      if (savedUser) {
        set({ user: JSON.parse(savedUser) });
      }
    }
  },
}));

