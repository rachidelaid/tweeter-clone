"use client";

import { AuthorType } from "@/types";
import clsx from "clsx";
import { Dot, HeartIcon } from "../elements/Icons";
import { useQueryClient } from "@tanstack/react-query";

const CommentLikeButton = ({
  likes = [],
  currentUserId,
  commentId,
  tweetId,
}: {
  likes?: AuthorType[];
  currentUserId: string | undefined;
  commentId: string;
  tweetId: string;
}) => {
  const liked_by_me = likes.some((l) => l.authorId === currentUserId);

  const queryClient = useQueryClient();

  const like = async () => {
    await fetch(`/api/like`, {
      method: "POST",
      body: JSON.stringify({
        commentId,
        userId: currentUserId,
      }),
    });
  };
  const unlike = async () => {
    const like = likes.find((l) => l.authorId === currentUserId);

    await fetch(`/api/like`, {
      method: "DELETE",
      body: JSON.stringify({
        likeId: like?.id,
      }),
    });
  };

  const handleClick = async () => {
    if (!currentUserId) return;

    if (liked_by_me) {
      await unlike();
    } else {
      await like();
    }

    queryClient.invalidateQueries({ queryKey: ["tweet", tweetId] });
  };

  return (
    <div
      className={clsx(
        "flex text-gray-400 text-xs font-semibold p-1 cursor-pointer items-center",
        liked_by_me && "text-red"
      )}
      role="button"
      onClick={handleClick}
    >
      <HeartIcon width={18} height={18} className="mr-2" />
      <span>Like</span>
      {likes && likes.length > 0 && (
        <>
          <Dot className="mx-4" />
          <span>{likes.length} likes</span>
        </>
      )}
    </div>
  );
};

export default CommentLikeButton;
