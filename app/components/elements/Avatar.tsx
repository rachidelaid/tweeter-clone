import clsx from "clsx";
import Image from "next/image";

interface AvatarProps {
  src?: string;
  alt: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const Avatar = ({
  src = "/user.png",
  alt,
  size = "sm",
  className,
}: AvatarProps) => {
  return (
    <div
      className={clsx(
        "relative overflow-hidden",
        size === "sm" ? "w-8 h-8" : size === "md" ? "w-10 h-10" : "w-32 h-32",
        size === "sm" ? "rounded" : "rounded-md",
        className
      )}
    >
      <Image src={src} alt={alt} layout="fill" />
    </div>
  );
};
