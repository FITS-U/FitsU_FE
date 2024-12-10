interface SubTextProps {
  title: string;
  description: string;
  hasColor?: true;
}

export const SubText = ({ title, description, hasColor } : SubTextProps) => {
  return (
    <div className="mt-6 space-y-2">
      <div className="text-contrast-200 font-semibold">{title}</div>
      {hasColor ? (
        <div className="text-orange-500 font-light">{description}</div>
      ) : (
        <div className="text-contrast-200 font-light">{description}</div>
      )}
    </div>
  );
};