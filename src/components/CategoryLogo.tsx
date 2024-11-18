import Image from "next/image"

interface CategoryLogoProps {
  w: number;
  h: number;
  name: string;
  iconSrc: string;
}

const CategoryLogo = ({w, h, name, iconSrc}: CategoryLogoProps) => {
  return <Image width={w} height={h} src={iconSrc} alt={`${name} 카테고리 로고`}/>
}

export default CategoryLogo;