import useCurrentUser from "@/hooks/useCurrentUser";
import CreatePostForm from "./components/widgets/CreatePostForm";
import NavBar from "./components/widgets/NavBar";
import TweetsList from "./components/widgets/TweetsList";
import prisma from "@/lib/prisma";

const Page = async () => {
  const currentUser = await useCurrentUser();

  const hashtags = await prisma.hashtag.findMany({
    include: {
      tweets: true,
    },
    orderBy: {
      tweets: {
        _count: "desc",
      },
    },
    take: 5,
  });

  return (
    <>
      <NavBar activeMenu="Home" />
      <main className="flex flex-col-reverse md:flex-row gap-6 mt-8 px-8">
        <div className="w-full flex flex-col gap-6">
          <CreatePostForm
            avatar={currentUser?.avatar?.url}
            name={currentUser?.name}
          />
          <TweetsList userId={undefined} />
        </div>
        {hashtags.length > 0 && (
          <div className="w-full md:w-1/3 shadow bg-white p-5 flex gap-6 flex-col rounded-lg h-fit">
            <p className="text-xs text-gray-100 font-semibold border-b border-gray-500 pb-2">
              Trends for you
            </p>
            {hashtags.map((item) => (
              <div key={item.name} className="flex flex-col gap-1">
                <p className="text-base text-gray-200 hover:text-primary cursor-pointer">
                  {item.name}
                </p>
                <p className="text-xs text-gray-400">
                  {item.tweets.length > 1000
                    ? `${Math.round(item.tweets.length / 1000)}k`
                    : item.tweets.length}{" "}
                  Tweets
                </p>
              </div>
            ))}
          </div>
        )}
      </main>
    </>
  );
};

export default Page;
