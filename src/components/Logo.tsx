import Image from "next/image";
import Link from "next/link";

export const Logo = () => {
  return (
    <Link href="/">
      <Image src="/icons/logo.svg" alt="Logo" className="w-48 h-20 hover:cursor-pointer" />
    </Link>
  );
}

export const LogoToRoot = () => {
  return (
    <Link href="/">
      <Image src="/icons/logo.svg" alt="Logo" className="w-24 h-6 hover:cursor-pointer" />
    </Link>
  );
}

export const LogoToAccounts = () => {
  return (
    <Link href="/accounts">
      <Image src="/icons/logo.svg" alt="Logo" className="w-24 h-6 hover:cursor-pointer" />
    </Link>
  );
}