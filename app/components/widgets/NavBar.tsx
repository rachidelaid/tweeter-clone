import Image from "next/image";
import clsx from "clsx";
import UserDropdown from "./UserDropdown";
import useCurrentUser from "@/hooks/useCurrentUser";
import Link from "next/link";

const links = ["Home", "Explore", "Bookmarks"] as const;

const NavBar = async ({
  activeMenu,
}: {
  activeMenu?: (typeof links)[number];
}) => {
  const currentUser = await useCurrentUser();

  return (
    <div className="flex items-center justify-between p-5 md:px-20 md:py-0 bg-white">
      <Image src="/twitter.svg" alt="logo" width={30} height={30} />

      <ul className="hidden md:flex gap-16 h-full text-gray-300">
        {links.map((item) => (
          <li
            key={`nav_${item}`}
            className={clsx(
              "h-full font-medium text-sm cursor-pointer py-6 border-b-4 border-transparent hover:border-primary",
              item === activeMenu && "text-primary !border-primary"
            )}
          >
            <Link href={`/${item === "Home" ? "" : item.toLocaleLowerCase()}`}>
              {item}
            </Link>
          </li>
        ))}
      </ul>

      <UserDropdown
        avatar={currentUser?.avatar?.url}
        name={currentUser?.name}
        username={currentUser?.username}
      />
    </div>
  );
};

export default NavBar;
