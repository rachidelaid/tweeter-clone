"use client";
import { Menu, Transition } from "@headlessui/react";
import clsx from "clsx";
import Link from "next/link";

interface MenuItem {
  label: string;
  onClick?: () => void;
  icon: React.ReactNode;
  variant?: "danger" | "default";
  hasBorderTop?: boolean;
  link?: string;
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
        {({ open }) => (
          <>
            <Menu.Button>{Button}</Menu.Button>
            <Transition
              show={open}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="border shadow flex flex-col gap-2 bg-white border-gray-500 p-3 absolute left-0 rounded-xl">
                {title && (
                  <span className="text-xs text-gray-200 font-semibold letterSpacing-4">
                    {title}
                  </span>
                )}
                {description && (
                  <span className="text-[11px] text-gray-400 font-normal letterSpacing-4 whitespace-nowrap mb-2">
                    {description}
                  </span>
                )}
                {items.map((item, index) => (
                  <Menu.Item key={`item_${index}`}>
                    {({ active }) => {
                      const Comp = item.link ? Link : "div";

                      return (
                        <Comp href={item.link as string} className="w-full">
                          <div
                            className={clsx(
                              "py-2 px-3 flex items-center gap-2 relative rounded-lg cursor-pointer text-gray-200",
                              active && "bg-gray-600",
                              item.hasBorderTop &&
                                "before:absolute before:inset-x-0 before:-top-2 before:h-px before:bg-gray-500 mt-2"
                            )}
                            onClick={(e) => {
                              e.stopPropagation();
                              item.onClick && item.onClick();
                            }}
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
                        </Comp>
                      );
                    }}
                  </Menu.Item>
                ))}
              </Menu.Items>
            </Transition>
          </>
        )}
      </Menu>
    </div>
  );
};
