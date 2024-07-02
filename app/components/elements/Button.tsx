import React from "react";
import { clsx } from "clsx";
import LoadingLayer from "./LoadingLayer";

//interface extends from the button element
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  isLoading?: boolean;
  className?: string;
  variant?: keyof typeof variants;
}

const variants = {
  primary: "text-white bg-primary-100 hover:bg-primary-200",
  transparent: "text-gray-200 bg-transparent hover:bg-gray-600",
};

export const Button = ({
  children,
  isLoading,
  className,
  variant = "primary",
  ...props
}: ButtonProps) => (
  <button
    disabled={isLoading}
    className={clsx(
      "text-xs rounded py-2 px-6 relative overflow-hidden",
      className,
      variants[variant]
    )}
    {...props}
  >
    {isLoading && <LoadingLayer variant={variant} />}
    {children}
  </button>
);
