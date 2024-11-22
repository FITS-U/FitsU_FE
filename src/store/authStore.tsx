import { create } from "zustand";

export type TitleType = "name" | "phoneNum" | "varifyNum";

interface State {
  name: string;
  phoneNum: string;
  varifyNum: string;
};

interface User {
  user: State;
  setUser: (user: State) => void;
}

export const useAuthStore = create<User>((set) => ({
  user:{
    name: "",
    phoneNum: "",
    varifyNum: "",
  },
  setUser: (user) => set({ user }),
}));
