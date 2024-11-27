import { AuthDescription, CardBenefitsList, RegisterBtnProps, RegisterInputProps, RrnInput, SignupFixedBtn, SignupInput } from "@/app/login/components/AboutAuth";

export interface SignupInputProps extends RegisterBtnProps, RegisterInputProps {
  descText: string;
  inputText: string;
}

export default ({ descText, inputText, title, maxLen, onNext }: SignupInputProps) => {
  return (
    <div>
      <AuthDescription text={descText} />
      {title == "cardBenefits" ? (
        <CardBenefitsList title={title} onNext={onNext}/>
      ) : (
        <SignupInput text={inputText} title={title} maxLen={maxLen} onNext={onNext} />
      )
      }
      {title == "phoneNum" && (
        <RrnInput title={"rrn"} onNext={onNext}/>
      )}
      <SignupFixedBtn title={title} onNext={onNext} />
    </div>
  );
}