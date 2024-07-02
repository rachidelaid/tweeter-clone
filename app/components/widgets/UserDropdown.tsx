"use client";

import { signOut } from "next-auth/react";
import React, { useState } from "react";
import { Avatar } from "../elements/Avatar";
import { Dropdown } from "../elements/Dropdown";
import {
  ChevronDownIcon,
  ProfileIcon,
  GroupIcon,
  GearIcon,
  LogoutIcon,
} from "../elements/Icons";
import clsx from "clsx";

interface NavBarProps {
  name?: string | null;
  avatar?: string | null;
  username?: string | null;
}

const UserDropdown = ({ name, avatar, username = "" }: NavBarProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
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
          <ChevronDownIcon
            className={clsx(
              "text-gray-100 hidden md:block transition-all delay-100",
              isDropdownOpen && "transform rotate-180"
            )}
          />
        </div>
      }
      items={[
        {
          label: "My Profile",
          icon: <ProfileIcon />,
          link: `/profile/${username}`,
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
  );
};

export default UserDropdown;
