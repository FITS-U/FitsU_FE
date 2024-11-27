import { create } from "zustand";

export type TitleType = "name" | "phoneNum" | "verifyNum";

interface State {
  name: string;
  phoneNum: string;
  verifyNum: string;
  token: string;
};

interface User {
  user: State;
  isVerified: boolean;
  setUser: (user: State) => void;
  setVerificationStatus: (status: boolean) => void;
}

export const useAuthStore = create<User>((set) => ({
  user:{
    name: "",
    phoneNum: "",
    verifyNum: "",
    token: ""
  },
  isVerified: false, // 초기값은 인증되지 않음
  setUser: (user) => set({ user }),
  setVerificationStatus: (status) => set({ isVerified: status }),
}));
