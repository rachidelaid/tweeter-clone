import Image from "next/image";
import { Avatar } from "./components/elements/Avatar";
import {
  FollowIcon,
  CommentIcon,
  RetweetIcon,
  HeartIcon,
  BookmarkIcon,
  ImageIcon,
} from "./components/elements/Icons";
import { Button } from "./components/elements/Button";
import NavBar from "./components/widgets/NavBar";
import { getSessionServerSide } from "@/lib/getSessionServerSide";
import prisma from "@/lib/prisma";
import clsx from "clsx";
import { dateFormater } from "@/lib/date";
import { Input } from "./components/elements/Input";

const page = async () => {
  const session = await getSessionServerSide();

  const user = await prisma.user.findUnique({
    where: { id: session?.user?.id.toString() },
    select: {
      id: true,
      name: true,
      avatar: {
        select: {
          url: true,
        },
      },
      bio: true,
    },
  });

  return (
    <>
      <NavBar avatar={user?.avatar?.url} name={user?.name} />

      <div className="container flex flex-col gap-6 mx-auto pt-56 px-4 md:px-0">
        <div className="absolute left-0 top-0 w-screen -z-10 h-96">
          <Image
            src="https://www.imagelighteditor.com/img/bg-after.jpg"
            alt="background"
            layout="fill"
          />
        </div>
        <div className="rounded-lg bg-white shadow p-5 pt-0 md:pt-5 flex flex-col md:flex-row items-center md:items-start gap-5">
          <Avatar
            src={user?.avatar?.url}
            alt={`${user?.name || "user"}'s avatar`}
            size="lg"
            className="border-4 border-white absolute md:-top-20 -top-32"
          />
          <div className="flex flex-col gap-6 w-full md:max-w-md lg:max-w-xl">
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
          {/* TODO: show follow button only if not following and not current user's profile */}
          <Button className="flex items-center gap-2 h-fit mx-auto md:mr-0 md:ml-auto">
            <FollowIcon />
            Follow
          </Button>
        </div>

        <main className="flex flex-col md:flex-row gap-6">
          <div className="w-full h-fit flex flex-col py-2 gap-2 md:w-80 rounded-lg bg-white shadow">
            {[
              {
                label: "Tweets",
                active: true,
              },
              {
                label: "Tweets & replies",
              },
              {
                label: "Media",
              },
              {
                label: "Likes",
              },
            ].map((item) => (
              <div
                className={clsx(
                  "p-4 text-sm font-semibold text-gray-300 border-l-4 cursor-pointer border-white hover:border-primary",
                  item?.active && "!border-primary text-primary"
                )}
                key={item.label}
              >
                {item?.label}
              </div>
            ))}
          </div>
          <div className="flex-1 flex flex-col gap-8">
            <Tweet />
          </div>
        </main>
      </div>
    </>
  );
};

const tweet = {
  author: {
    name: "John Doe",
    username: "johndoe",
    avatar: "https://www.imagelighteditor.com/img/bg-after.jpg",
  },
  createdAt: "2023-10-22T15:20:54.133Z",
  content: "lorem ipsum dolor sit amet consectetur adipisicing elit 1",
  likes: 10,
  retweets: 5,
  comments: 26,
  image: "https://www.imagelighteditor.com/img/bg-after.jpg",
};

const Tweet = () => (
  <div className="shadow bg-white rounded-lg p-4 md:p-5 flex flex-col gap-5">
    <div className="flex gap-4">
      <Avatar
        src={tweet.author.avatar}
        alt={`${tweet.author.name}'s avatar`}
        size="sm"
      />
      <div>
        <p className="text-black text-base font-medium">{tweet.author.name}</p>
        <span className="text-gray-400 text-xs font-medium">
          {dateFormater(tweet.createdAt)}
        </span>
      </div>
    </div>
    <p className="text-gray-200 text-base font-normal">{tweet.content}</p>
    <div className="relative w-full aspect-video rounded-lg overflow-hidden">
      <Image src={tweet.image} alt="tweet media" layout="fill" />
    </div>
    <div className="flex gap-4 justify-end">
      {tweet.comments > 0 && (
        <span className="text-gray-400 text-xs font-medium">
          {tweet.comments} Comments
        </span>
      )}
      {tweet.retweets > 0 && (
        <span className="text-gray-400 text-xs font-medium">
          {tweet.retweets} Retweets
        </span>
      )}
      {tweet.likes > 0 && (
        <span className="text-gray-400 text-xs font-medium">
          {tweet.likes} Likes
        </span>
      )}
    </div>
    <div className="flex border-y border-gray-600 justify-between py-1">
      {[
        {
          icon: <CommentIcon />,
          label: "Comment",
          className: "",
        },
        {
          icon: <RetweetIcon />,
          label: "Retweet",
          className: "",
        },
        {
          icon: <HeartIcon />,
          label: "Like",
          className: "",
        },
        {
          icon: <BookmarkIcon />,
          label: "Bookmark",
          className: "",
        },
      ].map((elm) => (
        <Button
          key={elm.label}
          variant="transparent"
          className={clsx("flex items-center gap-2", elm.className)}
        >
          {elm.icon}
          {elm.label}
        </Button>
      ))}
    </div>
    <div className="flex gap-4">
      <Avatar
        src={tweet.author.avatar}
        alt={`${tweet.author.name}'s avatar`}
        size="md"
      />
      <Input
        placeholder="Your Comment"
        className="w-full"
        suffix={<ImageIcon className="text-gray-400 mr-2" />}
      />
    </div>
  </div>
);

export default page;
