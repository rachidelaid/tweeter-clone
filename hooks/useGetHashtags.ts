import { useQuery } from "@tanstack/react-query";

const fetchHashtags = async (term: string) => {
  const resp = await fetch("http://localhost:9090/api/hashtags", {
    method: "POST",
    body: JSON.stringify({ term }),
  });

  const hashtags = await resp.json();

  return hashtags;
};

const useGetHashtagsList = (term: string) => {
  return useQuery({
    queryKey: ["hashtags", "list", term],
    queryFn: () => fetchHashtags(term),
  });
};

export { useGetHashtagsList, fetchHashtags };
