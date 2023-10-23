"use client";
import { Menu } from "@headlessui/react";
import clsx from "clsx";

interface MenuItem {
  label: string;
  onClick?: () => void;
  icon: React.ReactNode;
  variant?: "danger" | "default";
  hasBorderTop?: boolean;
}

interface ButtonProps {
  Button: React.ReactNode;
  title?: string;
  description?: string;
  items: MenuItem[];
}

export const Dropdown = ({
  Button,
  title,
  description,
  items,
}: ButtonProps) => {
  return (
    <div className="relative">
      <Menu>
        <Menu.Button>{Button}</Menu.Button>
        <Menu.Items className="border flex flex-col gap-2 bg-white border-gray-500 p-3 absolute right-0 rounded-xl">
          {title && (
            <span className="text-xs text-gray-200 font-semibold letterSpacing-4">
              {title}
            </span>
          )}
          {items.map((item, index) => (
            <Menu.Item key={`item_${index}`}>
              {({ active }) => (
                <div
                  className={clsx(
                    "py-2 px-3 flex items-center gap-2 relative rounded-lg cursor-pointer text-gray-200",
                    active && "bg-gray-600",
                    item.hasBorderTop &&
                      "before:absolute before:inset-x-0 before:-top-2 before:h-px before:bg-gray-500 mt-2"
                  )}
                >
                  {item.icon}
                  <p
                    className={clsx(
                      "text-xs font-medium whitespace-nowrap",
                      item.variant === "danger" && "text-red-500"
                    )}
                  >
                    {item.label}
                  </p>
                </div>
              )}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Menu>
    </div>
  );
};
