"use client";
import LoadingTweet from "./LoadingTweet";
import Tweet from "./Tweet";
import { useGetTweets } from "@/hooks/useGetTweets";

const TweetsList = ({ userId }: { userId: string | undefined }) => {
  const { data: tweets, isFetching } = useGetTweets(userId);

  if (isFetching)
    return (
      <div className="flex flex-col gap-8 flex-1">
        <LoadingTweet />
        <LoadingTweet />
        <LoadingTweet />
      </div>
    );

  return (
    <div className="flex-1 flex flex-col gap-8">
      {tweets?.length ? (
        <>
          {tweets?.map((tweet: any) => (
            <Tweet key={tweet.id} id={tweet.id} />
          ))}
        </>
      ) : (
        <p className="text-gray-300 text-xs p-4 py-5 text-center">
          no tweetes yet.
        </p>
      )}
    </div>
  );
};

export default TweetsList;
