"use client";

import { Avatar } from "../elements/Avatar";
import { dateFormater } from "@/lib/date";
import { CommentProps } from "@/types";
import Image from "next/image";
import CommentLikeButton from "./CommentLineButton";
import { useSession } from "next-auth/react";

const Comment = ({
  author,
  createdAt,
  content,
  likes,
  Media,
  id,
  tweetId,
}: CommentProps & { tweetId: string }) => {
  const currentUser = useSession().data?.user as any;

  return (
    <div className="flex gap-2">
      <Avatar
        src={author.avatar?.url}
        alt={`${author.name}'s avatar`}
        size="sm"
      />
      <div className="w-full">
        <div className="bg-gray-700 rounded-lg p-4 w-full">
          <div className="flex items-center gap-4">
            <span className="text-xs text-black font-medium">
              {author.name}
            </span>
            <span className="text-xs text-gray-400 font-medium">
              {dateFormater(createdAt)}
            </span>
          </div>
          <p className="text-gray-200 text-sm font-normal mt-2">{content}</p>
          {Media?.[0]?.url && (
            <div className="relative w-full aspect-video rounded-lg overflow-hidden mt-2">
              <Image
                src={Media?.[0]?.url}
                alt="tweet media"
                layout="fill"
                objectFit="cover"
              />
            </div>
          )}
        </div>
        <CommentLikeButton
          currentUserId={currentUser?.id as string}
          likes={likes}
          commentId={id}
          tweetId={tweetId}
        />
      </div>
    </div>
  );
};

export default Comment;
