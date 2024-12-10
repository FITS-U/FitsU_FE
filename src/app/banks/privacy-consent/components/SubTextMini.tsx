interface SubTextMiniProps {
  title: string;
  description: string;
}

export const SubTextMini = ({ title, description } : SubTextMiniProps) => {
  return (
    <div className="mt-6 space-y-2">
      <div className="text-contrast-200 font-semibold">{title}</div>
      <div className="text-contrast-200 font-light text-xs">{description}</div>
    </div>
  );
};