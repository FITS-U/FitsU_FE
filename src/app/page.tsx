import { AuthBtn } from "@/app/login/components/AboutAuth";
import Link from "next/link";

export default function Home() {
  return (
    <div className="p-8 flex items-center justify-center h-screen text-white">
      <div className="flex flex-col items-center space-y-12 w-full">
        <Link href="/login" className="w-4/5">
          <AuthBtn text="로그인" />
        </Link>
        <Link href="/register" className="w-4/5">
          <AuthBtn text="회원가입" />
        </Link>
      </div>
    </div>
  );
}
