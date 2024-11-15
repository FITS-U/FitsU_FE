"use client"

import { usePathname } from "next/navigation"; // App Router에서 사용하는 훅

const CategoryPage = () => {
  const pathname = usePathname();
  const category = pathname?.split("/").pop();

  const renderContent = () => {
    switch (category) {
      case 'food':
        return <p>식비 관련 콘텐츠</p>;
      case 'transport':
        return <p>교통 관련 콘텐츠</p>;
      case 'shopping':
        return <p>쇼핑 관련 콘텐츠</p>;
      case 'cafe':
        return <p>카페 관련 콘텐츠</p>;
      case 'hobby':
        return <p>취미 관련 콘텐츠</p>;
      default:
        return <p>카테고리를 선택하세요.</p>;
    }
  };

  return (
    <div className='text-white'>
      <h1>Category: {category}</h1>
      {renderContent()}
    </div>
  );
};

export default CategoryPage;