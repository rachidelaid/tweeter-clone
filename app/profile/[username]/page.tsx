("");

import Image from "next/image";
import { Avatar } from "../../components/elements/Avatar";
import { FollowIcon } from "../../components/elements/Icons";
import { Button } from "../../components/elements/Button";
import NavBar from "../../components/widgets/NavBar";
import SideNav from "../../components/widgets/SideNav";
import TweetsList from "../../components/widgets/TweetsList";
import { getSessionServerSide } from "@/lib/getSessionServerSide";
import { notFound } from "next/navigation";
import useGetUser from "@/hooks/useGetUser";

const Page = async ({
  params: { username },
}: {
  params: {
    username: string;
  };
}) => {
  const session = await getSessionServerSide();

  const myProfile = session?.user?.username === username;

  const user = await useGetUser(username);

  if (!user) {
    return notFound();
  }

  return (
    <>
      <NavBar />

      <div className="container flex flex-col gap-6 mx-auto pt-56 px-4 md:px-0">
        <div className="absolute left-0 top-0 w-screen -z-10 h-96">
          <Image
            src={
              user?.Profile[0]?.banner?.url ||
              "https://www.imagelighteditor.com/img/bg-after.jpg"
            }
            alt="background"
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="rounded-lg bg-white shadow p-5 pt-0 md:pt-5 flex flex-col md:flex-row items-center md:items-start gap-5">
          <Avatar
            src={user?.avatar?.url}
            alt={`${user?.name || "user"}'s avatar`}
            size="lg"
            className="border-4 border-white absolute md:-top-20 -top-[60px]"
          />
          <div className="flex flex-col gap-6 w-full md:max-w-md lg:max-w-xl -mt-12 md:mt-0">
            <div className="flex items-center gap-2 md:gap-6 flex-wrap flex-col md:flex-row">
              <h1 className="text-xl font-normal text-gray-100">
                {user?.name}
              </h1>
              <p className="text-xs text-gray-300">
                <span className="text-gray-100 font-bold">10.8K</span> Followers
                {/* TODO: Add followers */}
              </p>
              <p className="text-xs text-gray-300">
                <span className="text-gray-100 font-bold">2,569</span> Following
                {/* TODO: Add following */}
              </p>
            </div>
            <p className="text-gray-300 text-md letterSpacing-2 text-center md:text-left">
              {user?.bio}
            </p>
          </div>
          {!myProfile && (
            <Button className="flex items-center gap-2 h-fit mx-auto md:mr-0 md:ml-auto">
              <FollowIcon />
              Follow
            </Button>
          )}
        </div>

        <main className="flex flex-col md:flex-row gap-6">
          <SideNav />
          <TweetsList userId={user?.id} />
        </main>
      </div>
    </>
  );
};

export default Page;
