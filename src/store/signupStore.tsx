import { create } from "zustand"

export type SignupType = "name"
                        | "phoneNum"
                        | "rrn"
                        | "varifyNum"
                        | "cardBenefits";


interface SignupState {
  name: string;
  phoneNum: string;
  rrn: string;
  varifyNum: string;
  cardBenefits: string[];
}

interface SignupUser {
  newUser: SignupState;
  setNewUser: (newUser: SignupState) => void;
}

export const useSignupStore = create<SignupUser>((set) => ({
  newUser: {
    name: "",
    phoneNum: "",
    rrn: "",
    varifyNum: "",
    cardBenefits: [],
  },
  setNewUser: (newUser) => set({ newUser }),
}))