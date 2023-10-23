/* eslint-disable react/display-name */
import clsx from "clsx";
import { forwardRef } from "react";

interface InputProps {
  error?: string;
  type?: string;
  placeholder?: string;
  className?: string;
  suffix?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ error, className, suffix, ...props }, ref) => {
    return (
      <div className="w-full">
        <div
          className={clsx(
            "w-full flex items-center gap-4 bg-gray-700 placeholder:text-gray-400 text-sm placeholder:text-sm border border-gray-600 rounded",
            error && "border-red",
            className
          )}
        >
          <input
            ref={ref}
            {...props}
            className="outline-none ring-0 px-3 py-2 bg-transparent w-full"
          />
          {suffix}
        </div>
        {error && <span className="text-red text-xs mt-1">{error}</span>}
      </div>
    );
  }
);
