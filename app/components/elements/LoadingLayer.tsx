import clsx from "clsx";

const variants = {
  primary: "text-white bg-primary-100",
  transparent: "text-gray-200 bg-black/50",
};

const LoadingLayer = ({
  variant = "transparent",
}: {
  variant?: keyof typeof variants;
}) => {
  return (
    <div
      className={clsx(
        "absolute inset-0 flex justify-center items-center z-20",
        variants[variant]
      )}
    >
      <div className="loader" />
    </div>
  );
};

export default LoadingLayer;
