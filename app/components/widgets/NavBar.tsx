"use client";

import { useState } from "react";
import Image from "next/image";
import { Avatar } from "../elements/Avatar";
import { Dropdown } from "../elements/Dropdown";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  ProfileIcon,
  GroupIcon,
  GearIcon,
  LogoutIcon,
} from "../elements/Icons";
import { signOut } from "next-auth/react";
import clsx from "clsx";

interface NavBarProps {
  name?: string | null;
  avatar?: string | null;
}

const NavBar = ({ name, avatar }: NavBarProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div className="flex items-center justify-between p-5 md:px-20 md:py-0 bg-white">
      <Image src="/twitter.svg" alt="logo" width={30} height={30} />

      <ul className="hidden md:flex gap-16 h-full text-gray-300">
        {[
          {
            label: "Home",
            active: true,
          },
          {
            label: "Explore",
          },
          ,
          {
            label: "Bookmarks",
          },
        ].map((item) => (
          <li
            key={`nav_${item}`}
            className={clsx(
              "h-full font-medium text-sm cursor-pointer py-6 border-b-4 border-transparent hover:border-primary",
              item?.active && "text-primary border-primary"
            )}
          >
            {item?.label}
          </li>
        ))}
      </ul>

      <Dropdown
        Button={
          <div
            className="flex items-center gap-2"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <Avatar
              src={avatar || undefined}
              alt={`${name}'s avatar`}
              size="sm"
            />
            <span className="text-gray-100 font-bold text-xs hidden md:block">
              {name}
            </span>
            {isDropdownOpen ? (
              <ChevronDownIcon className="text-gray-100 hidden md:block" />
            ) : (
              <ChevronUpIcon className="text-gray-100 hidden md:block" />
            )}
          </div>
        }
        items={[
          {
            label: "My Profile",
            icon: <ProfileIcon />,
          },
          {
            label: "Group Chat",
            icon: <GroupIcon />,
          },
          {
            label: "Settings",
            icon: <GearIcon />,
          },
          {
            label: "Logout",
            icon: <LogoutIcon className="text-red" />,
            variant: "danger",
            hasBorderTop: true,
            onClick() {
              signOut();
            },
          },
        ]}
      />
    </div>
  );
};

export default NavBar;
