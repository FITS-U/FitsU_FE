"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
import FoodPage from "./Food";
import TransportPage from "./Transport";
import ShoppingPage from "./Shopping";
import CafePage from "./Cafe";
import HobbyPage from "./Hobby";

const CategoryPage = () => {
  const pathname = usePathname();
  const category = pathname?.split("/").pop();

  const renderContent = () => {
    switch (category) {
      case 'food':
        return <FoodPage />;
      case 'transport':
        return <TransportPage />;
      case 'shopping':
        return <ShoppingPage />;
      case 'cafe':
        return <CafePage />;
      case 'hobby':
        return <HobbyPage />;
      default:
        return <p>카테고리를 선택하세요.</p>;
    }
  };

  return (
    <div className="p-8 text-white">
      <div className="flex items-center justify-between">
        <Link href="/my-spend/categories" className="text-3xl">&lt;</Link>
        <span>소비 카테고리</span><span />
      </div>
      {renderContent()}
    </div>
  );
};

export default CategoryPage;