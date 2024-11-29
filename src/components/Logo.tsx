import Link from "next/link";

export const Logo = () => {
  return (
    <Link href="/">
      <img src="/icons/logo.svg" alt="Logo" className="w-24 h-6 hover:cursor-pointer" />
    </Link>
  );
}