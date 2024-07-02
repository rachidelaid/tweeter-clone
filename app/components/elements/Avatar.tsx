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
        size === "sm" ? "rounded" : size === "md" ? "rounded-md" : "rounded-lg",
        className
      )}
      style={{
        width: size === "sm" ? "2rem" : size === "md" ? "2.5rem" : "8rem",
        minWidth: size === "sm" ? "2rem" : size === "md" ? "2.5rem" : "8rem",
        height: size === "sm" ? "2rem" : size === "md" ? "2.5rem" : "8rem",
        minHeight: size === "sm" ? "2rem" : size === "md" ? "2.5rem" : "8rem",
      }}
    >
      <Image src={src} alt={alt} fill objectFit="cover" layout="fill" />
    </div>
  );
};
