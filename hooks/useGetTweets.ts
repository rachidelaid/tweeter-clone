import { useQuery } from "@tanstack/react-query";

const fetchTweets = async (userId: string | undefined) => {
  const resp = await fetch("http://localhost:9090/api/tweets/getAll", {
    method: "POST",
    body: JSON.stringify({ userId }),
  });

  const tweets = await resp.json();

  return tweets;
};

const useGetTweets = (userId: string | undefined) => {
  return useQuery({
    queryKey: ["tweets", "getAll", userId || "all"],
    queryFn: () => fetchTweets(userId),
  });
};

export { useGetTweets, fetchTweets };
