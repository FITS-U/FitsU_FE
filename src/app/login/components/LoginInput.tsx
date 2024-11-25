import { AuthBtnProps, AuthDescription, AuthFixedBtn, AuthInput, AuthInputProps } from "@/app/login/components/AboutAuth";

export interface LoginInputProps extends AuthBtnProps, AuthInputProps {
  inputText: string;
  descText: string;
}

export default ({ inputText, descText, onNext, title, maxLen }: LoginInputProps) => {
  return (
    <div>
      <AuthDescription text={descText} />
      <AuthInput onNext={onNext} text={inputText} title={title} maxLen={maxLen}/>
      <AuthFixedBtn onNext={onNext} title={title} />
    </div>
  );
}