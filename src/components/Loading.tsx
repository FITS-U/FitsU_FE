interface LoadingProps {
  message?: string;
}

export const Loading: React.FC<LoadingProps> = ({ message = "Loading..." }) => {
  return (
    <div className="flex justify-center items-center h-screen text-white">
      <p>{message}</p>
    </div>
  );
};
