"use client"

import { useSignupStore } from "@/store/signupStore";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SignupInputProps } from "./components/SignupInput";
import { Register, SendSms } from "@/api/auth";
import { saveInterestCtg } from "@/api/category";
import { LogoToRoot } from "@/components/Logo";
import Signup from "./components/SignupInput";

const RegisterPage = () => {
  const { newUser, setNewUser } = useSignupStore();
  const [step, setStep] = useState(0);
  const router = useRouter();

  const SignupInputList: SignupInputProps[] = [
    {
      title: "name",
      descText: "이름을 입력해주세요.",
      inputText: "이름",
      onNext: () => setStep(1),
      maxLen: 6,
      text: ""
    },
    {
      title: "phoneNum",
      descText: "휴대폰 번호를 입력해주세요.",
      inputText: "휴대폰 번호",
      onNext: async() => {
        try {
          const data = await SendSms(newUser.phoneNum);
          setNewUser({...newUser, verifyNum:data});
          setStep(2);
        } catch (error) {
          console.log("Failed to receive sms:", error);
          alert("인증번호 메세지 발송 실패");
          window.location.reload();
        }
      },
      maxLen: 11,
      text: ""
    },
    {
      title: "verifyNum",
      descText: "인증번호를 입력해주세요.",
      inputText: "인증번호",
      onNext: () => setStep(3),
      maxLen: 6,
      text: ""
    },
    {
      title: "nickname",
      descText: "사용할 별명을 입력해주세요.",
      inputText: "별명",
      onNext: async() => {
        try {
          const data = await Register(newUser.name, newUser.rrn, newUser.phoneNum, newUser.nickname, newUser.token);
          setNewUser({...newUser, token: data});
          setStep(4);
        } catch (error) {
          console.log("Failed to validation code:", error);
          alert("회원가입에 실패했습니다.");
          window.location.reload();
        }
      },
      maxLen: 10,
      text: ""
    },
    {
      title: "cardBenefits",
      descText: "관심있는 카드 혜택을 5가지 선택해주세요.",
      inputText: "",
      onNext: async() => {
        try {
          const cardBenefitsAsNumbers = newUser.cardBenefits.map(Number);
          await saveInterestCtg(cardBenefitsAsNumbers, newUser.token);
          alert("관심 카드혜택 등록 성공");
          router.push("/login");
        } catch (error) {
          console.log("Failed to validation code:", error);
          alert("관심 카드혜택 등록 실패");
          // window.location.reload();
        }
      },
      maxLen: 10,
      text: ""
    },
  ]

  return (
    <div className="p-8 text-white h-screen relative overflow-hidden">
      <LogoToRoot />
      <Signup {...SignupInputList[step]} />
    </div>
  );
}

export default RegisterPage;