import { create } from "zustand"

export type SignupType = "name"
                        | "phoneNum"
                        | "rrn"
                        | "verifyNum"
                        | "nickname"
                        | "cardBenefits";


interface SignupState {
  name: string;
  phoneNum: string;
  firstRrn: string;
  secondRrn: string;
  rrn: string;
  verifyNum: string;
  token: string;
  nickname: string;
  cardBenefits: string[];
}

interface SignupUser {
  newUser: SignupState;
  isVerified: boolean;
  setNewUser: (newUser: SignupState) => void;
  setVerificationStatus: (status: boolean) => void;
}

export const useSignupStore = create<SignupUser>((set) => ({
  newUser: {
    name: "",
    phoneNum: "",
    firstRrn: "",
    secondRrn: "",
    rrn: "",
    verifyNum: "",
    token: "",
    nickname: "",
    cardBenefits: [],
  },
  isVerified: false,
  setNewUser: (newUser) => set({ newUser }),
  setVerificationStatus: (status) => set({ isVerified: status }),
}))