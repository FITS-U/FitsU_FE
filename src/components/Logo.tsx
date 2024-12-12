import Image from "next/image";
import Link from "next/link";

export const Logo = () => {
  return (
    <Link href="/">
      <Image src="/icons/logo.svg" alt="Logo" width={192} height={80} className="hover:cursor-pointer" />
    </Link>
  );
}

export const LogoToRoot = () => {
  return (
    <Link href="/">
      <Image src="/icons/logo.svg" alt="Logo" width={96} height={24} className="hover:cursor-pointer" />
    </Link>
  );
}

export const LogoToAccounts = () => {
  return (
    <Link href="/accounts">
      <Image src="/icons/logo.svg" alt="Logo" width={96} height={24} className="hover:cursor-pointer" />
    </Link>
  );
}