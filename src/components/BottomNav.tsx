"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaHouse, FaChartPie, FaBoltLightning, FaCreditCard } from "react-icons/fa6";

const BottomNav = () => {
  const currentPath = usePathname();

  const links = [
    { href: "/accounts", icon: FaHouse, label: "홈" },
    { href: "/my-spend", icon: FaChartPie, label: "내소비" },
    { href: "/recommends", icon: FaBoltLightning, label: "카드추천" },
    { href: "/shopping", icon: FaCreditCard, label: "모든카드" },
  ];

  return (
    <div className="w-full h-20 absolute -left-0 bottom-0 border-t-[1px] border-contrast-500 rounded-3xl bg-black">
      <div className="flex items-center justify-between px-8 py-4">
        {links.map(({ href, icon: Icon, label }) => (
          <Link key={href} href={href}>
            <span
              className={`flex flex-col items-center space-y-1 ${
                currentPath === href ? "text-contrast-100" : "text-contrast-300"
              }`}
            >
              <Icon className="w-8 h-7" />
              <div className="text-xs font-semibold">{label}</div>
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BottomNav;
