"use client"

import { verifyCode } from "@/api/auth";
import { getCategories } from "@/api/category";
import { Loading } from "@/components/Loading";
import { SignupType, useSignupStore } from "@/store/signupStore";
import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from "react";


export interface RegisterInputProps { text:string; title:SignupType; maxLen:number; onNext?:()=>void; }
// 회원가입 input 버튼 컴포넌트
export const SignupInput = ({ text, title, maxLen, onNext } : RegisterInputProps) => {
  const { newUser, setNewUser, setVerificationStatus } = useSignupStore();

  const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
    const {value} = e.target;
    setNewUser({ ...newUser, [title]:value });
  }

  const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key == "Enter") {
      if (onNext) onNext();
    }
  };

  const verifyNum = async () => {
    try {
      const data = await verifyCode(newUser.phoneNum, newUser.verifyNum);
      setNewUser({ ...newUser, token:data });
      setVerificationStatus(true);
      alert("번호 인증에 성공했습니다.");
    } catch (error) {
      console.error("Failed to validation code:", error);
      alert("인증번호가 올바르지 않습니다.");
    }
  };

  return (
    <div className="flex items-center">
      <div className="w-full flex flex-col text-main-color">
        <div className="font-semibold mb-4">{text}</div>
        <div className="relative">
          <input
            type="text"
            placeholder={text}
            maxLength={maxLen}
            value={newUser[title]}
            onChange={onChangeHandler}
            onKeyDown={onKeyDownHandler}
            className="w-full h-14 p-3 border border-current rounded-lg bg-black focus:outline-none focus:ring-0 placeholder:text-main-color"
          />
          {title == "verifyNum" && (
            <button
              onClick={verifyNum}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-main-color text-black px-4 py-2 rounded-lg font-bold"
            >
              확인
            </button>
          )}
        </div>
      </div>
    </div>
  );
};


export const RrnInput = ({ title, onNext }: RegisterBtnProps) => {
  const { newUser, setNewUser } = useSignupStore();
  const [firstPart, setFirstPart] = useState("");
  const [secondPart, setSecondPart] = useState("");
  const [showPlaceholder, setShowPlaceholder] = useState(true);
  const secondPartRef = useRef<HTMLInputElement>(null);

  const handleFirstPartChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 6) {
      setFirstPart(value);
      if (value.length === 6) {
        setNewUser({ ...newUser, firstRrn: value });
        setTimeout(() => {
          secondPartRef.current?.focus();
        }, 0);
      }
    }
  };

  const handleSecondPartChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 1) {
      setSecondPart(value);
      if (value.length === 1) {
          setNewUser({ ...newUser, secondRrn: value });
      }
    }
  };

  const onFocusHandler = () => setShowPlaceholder(false);
  const onBlurHandler = () => setShowPlaceholder(true);

  return (
    <div className="mt-10 flex items-center text-main-color">
      <div className="w-full flex flex-col">
        <div>주민등록번호</div>
        <div className="w-full flex space-x-4">
          <input
            type="text"
            placeholder={showPlaceholder ? "앞 6자리" : ""}
            maxLength={6}
            value={firstPart}
            onFocus={onFocusHandler}
            onBlur={onBlurHandler}
            onChange={handleFirstPartChange}
            className="w-1/2 h-14 text-center bg-black border-b-current border-b-2 focus:outline-none focus:ring-0 placeholder:text-main-color"
          />
          <div className="flex w-6 items-center justify-center">ㅡ</div>
          <div className="w-1/2 h-14 text-center bg-black border-b-current border-b-2 flex items-center justify-center relative">
            <span className="w-full h-full flex justify-center items-center text-main-color pointer-events-none">
              {secondPart ? `******` : "******"}
            </span>
            <input
              type="text"
              ref={secondPartRef}
              maxLength={1}
              value={secondPart}
              onFocus={onFocusHandler}
              onBlur={onBlurHandler}
              onChange={handleSecondPartChange}
              className={`absolute top-0 left-0 w-full h-full bg-transparent focus:outline-none focus:ring-0 pointer-events-none ${
                firstPart.length !== 6 ? "invisible z-[-1]" : "visible z-[1]"
              }`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};


export interface RegisterBtnProps { onNext?:()=>void; title:SignupType; }
// 하단에 고정되어 있는 버튼 컴포넌트
export const SignupFixedBtn = ({ onNext, title }: RegisterBtnProps) => {
  const { newUser, setNewUser } = useSignupStore();

  const updateUserRrn = () => {
    setNewUser({ ...newUser, rrn: `${newUser.firstRrn}${newUser.secondRrn}` });
  };

  // Enter 키를 눌렀을 때 처리
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      if (title === "phoneNum" && newUser.secondRrn) {
        updateUserRrn(); // 두 번째 주민번호가 존재하면 업데이트
      }
    }
  };

  // button의 disabled 상태는 기본적으로 newUser[title]이 비어있으면 disabled
  // title이 "phoneNum"일 경우 secondRrn이 비어있으면 disabled
  const isDisabled = newUser[title] === "";

  return (
    <div className="absolute block bottom-4 w-full -left-0">
      <div className="px-6">
        <button
          className={`p-4 w-full x-2 font-bold text-black text-lg rounded-2xl ${
            isDisabled ? "bg-gray-500" : "bg-main-color"
          }`}
          disabled={isDisabled}
          onClick={() => {
            if (title === "phoneNum" && newUser.secondRrn) {
              updateUserRrn(); // 두 번째 주민번호가 존재하면 업데이트
            }
            if (onNext) onNext(); // onNext 함수 실행
          }}
          onKeyDown={handleKeyDown} // Enter 키 이벤트 처리
        >
          확인
        </button>
      </div>
    </div>
  );
};

export interface Category {
  categoryId: number;
  categoryName: string;
}
export const CardBenefitsList = ({ title, onNext }: RegisterBtnProps) => {
  const { newUser, setNewUser } = useSignupStore();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (error) {
        console.error("Failed to fetch bank list:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return <Loading />
  }

  const deselectBenefits = () => {
    setNewUser({ ...newUser, cardBenefits: [] });
  }

  const handleSelect = (benefitId: number) => {
    const benefitIdStr = benefitId.toString();
    const currentBenefits = newUser.cardBenefits;
    if (currentBenefits.includes(benefitIdStr)) {
      // 선택 해제
      const updatedBenefits = currentBenefits.filter((id) => id !== benefitIdStr);
      setNewUser({ ...newUser, cardBenefits: updatedBenefits });
    } else {
      // 선택 추가 (5개까지 제한)
      if (currentBenefits.length < 5) {
        const updatedBenefits = [...currentBenefits, benefitIdStr];
        setNewUser({ ...newUser, cardBenefits: updatedBenefits });
      }
    }
  };

  return (
    <div className="items-center">
      <div className="flex items-center justify-between mb-4 text-sm font-light tracking-tighter">
        <span>{newUser.cardBenefits.length}개 선택됨</span>
        <span onClick={deselectBenefits} className="cursor-pointer">선택 해제</span>
      </div>
      <div className="w-full grid grid-cols-3 gap-4 justify-between text-main-color overflow-y-auto scrollbar-hide max-h-[calc(100vh-360px)]">
        {categories.map(({categoryId, categoryName}) => (
          <div 
            key={categoryId}
            onClick={() => handleSelect(categoryId)}
            className={`p-2 h-20 rounded-lg border-current border-2 cursor-pointer flex items-center justify-center font-semibold text-center break-words ${newUser.cardBenefits.includes(categoryId.toString()) ? "bg-main-color text-black" : ""}`}
          >
            <span className="block">{categoryName}</span>
          </div>
        ))}
      </div>
    </div>
  );
};