import { useState, useMemo } from "react";
import Comment from "./Comment";
import { CommentProps } from "@/types";
import clsx from "clsx";

const CommentsList = ({
  comments,
  tweetId,
}: {
  comments: CommentProps[];
  tweetId: string;
}) => {
  const [expanded, setExpanded] = useState(false);

  const list = useMemo(() => {
    return expanded ? comments : comments.slice(0, 3);
  }, [expanded, comments]);

  return (
    <div className={clsx("flex flex-col gap-4")}>
      {list.map((comment) => (
        <Comment
          {...comment}
          likes={
            comment && comment.likes && comment.likes.length > 0
              ? comment?.likes.map((l: any) => ({
                  id: l.id,
                  name: l.author.name,
                  avatar: l.author.avatar,
                  authorId: l.author.id,
                }))
              : []
          }
          key={comment.id}
          tweetId={tweetId}
        />
      ))}
      {comments.length > 3 && (
        <div
          className="pt-4 cursor-pointer text-center border-t border-gray-500 text-gray-300 text-xs hover:text-primary hover:border-primary transition-all delay-75"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? "show less" : "show more"}
        </div>
      )}
    </div>
  );
};

export default CommentsList;
