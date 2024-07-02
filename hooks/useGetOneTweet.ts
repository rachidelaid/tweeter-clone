import { useQuery } from "@tanstack/react-query";

const fetchOneTweet = async (tweetId: string) => {
  const resp = await fetch("http://localhost:9090/api/tweets/getOne", {
    method: "POST",
    body: JSON.stringify({ tweetId }),
  });

  const tweets = await resp.json();

  return tweets;
};

const useGetOneTweet = (tweetId: string) => {
  return useQuery({
    queryKey: ["tweet", tweetId],
    queryFn: () => fetchOneTweet(tweetId),
  });
};

export { useGetOneTweet, fetchOneTweet };
