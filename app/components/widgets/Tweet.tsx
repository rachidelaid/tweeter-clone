import { dateFormater } from "@/lib/date";
import { Input } from "../elements/Input";
import Image from "next/image";
import { Button } from "../elements/Button";
import { Avatar } from "../elements/Avatar";

import {
  RetweetIcon,
  HeartIcon,
  BookmarkIcon,
  ImageIcon,
  SendIcon,
} from "../elements/Icons";

import clsx from "clsx";
import { TweetProps } from "@/types";
import { useSession } from "next-auth/react";
import { useGetOneTweet } from "@/hooks/useGetOneTweet";
import { useQueryClient } from "@tanstack/react-query";
import { useRef, useState } from "react";
import CommentsList from "./CommentsList";
import LoadingTweet from "./LoadingTweet";
import { uploadImage } from "@/lib/cloudinary";
import ImagePreview from "./ImagePreview";
import LoadingLayer from "../elements/LoadingLayer";

const regx = /[#]\w+/gm;

const CommentImageUploader = ({
  onChange,
}: {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  const imageInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e);
    imageInputRef.current?.blur();
  };

  return (
    <>
      <input
        ref={imageInputRef}
        type="file"
        name="comment_image"
        accept="image/*"
        className="hidden w-0 h-0"
        onChange={handleChange}
      />
      <ImageIcon
        className="text-gray-400 mr-2 cursor-pointer hover:text-primary"
        onClick={() => imageInputRef.current?.click()}
      />
    </>
  );
};

const Tweet = ({ id }: { id: string }) => {
  const queryClient = useQueryClient();

  const commentInputRef = useRef<HTMLInputElement>(null);

  const currentUser = useSession().data?.user as any;
  const { data } = useGetOneTweet(id);

  const [imagePreview, setImagePreview] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const alreadyLiked = data?.likes?.some(
    (l: any) => l.author.id === currentUser?.id
  );

  const alreadySaved = data?.bookmarks?.some(
    (b: any) => b.authorId === currentUser?.id
  );

  if (!data) return <LoadingTweet />;

  const { author, createdAt, content, comments, retweets, likes } =
    data as TweetProps;

  const image = data?.Media?.[0]?.url;

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files?.[0];

    if (!file) return;

    setImagePreview(file);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const comment = formData.get("comment");

    if (!comment) return;

    try {
      setLoading(true);
      const imageUrl = imagePreview ? await uploadImage(imagePreview) : null;

      const res = await fetch(`http://localhost:9090/api/comment/create`, {
        method: "POST",
        body: JSON.stringify({
          content: comment,
          tweetId: id,
          userId: currentUser?.id,
          image: imageUrl || undefined,
        }),
      });

      if (res.ok) {
        queryClient.invalidateQueries({ queryKey: ["tweet", id] });

        if (commentInputRef.current) commentInputRef.current.value = "";
        setImagePreview(null);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async () => {
    const body: {
      tweetId?: string;
      likeId?: string;
      userId: string;
    } = {
      userId: currentUser?.id,
    };

    if (alreadyLiked)
      body.likeId = data.likes?.find(
        (l: any) => l.author.id === currentUser?.id
      )?.id;

    if (!alreadyLiked) body.tweetId = id;

    try {
      const res = await fetch("http://localhost:9090/api/like", {
        method: alreadyLiked ? "DELETE" : "POST",
        body: JSON.stringify(body),
      });

      if (res.ok) {
        queryClient.invalidateQueries({ queryKey: ["tweet", id] });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleBookmark = async () => {
    if (alreadySaved) {
      const bookmark = data.bookmarks?.find(
        (b: any) => b.authorId === currentUser?.id
      );

      try {
        const res = await fetch(`http://localhost:9090/api/bookmark`, {
          method: "DELETE",
          body: JSON.stringify({
            id: bookmark?.id,
          }),
        });

        if (res.ok) {
          console.log("Bookmark deleted");
          queryClient.invalidateQueries({ queryKey: ["tweet", id] });
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const res = await fetch(`http://localhost:9090/api/bookmark`, {
          method: "POST",
          body: JSON.stringify({
            tweetId: id,
            userId: currentUser?.id,
          }),
        });

        if (res.ok) {
          queryClient.invalidateQueries({ queryKey: ["tweet", id] });
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="shadow bg-white rounded-lg p-4 md:p-5 flex flex-col gap-5">
      <div className="flex gap-4">
        <Avatar
          src={author?.avatar?.url}
          alt={`${author.name}'s avatar`}
          size="sm"
        />
        <div>
          <p className="text-black text-base font-medium">{author.name}</p>
          <span className="text-gray-400 text-xs font-medium">
            {dateFormater(createdAt)}
          </span>
        </div>
      </div>
      <div
        className="text-gray-200 text-base font-normal flex gap-2"
        dangerouslySetInnerHTML={{
          __html: content
            .replaceAll(
              regx,
              (hashtag) => `<span style="color:#2F80ED">${hashtag}</span>`
            )
            .replaceAll("\n", "<br/>"),
        }}
      />
      {image && (
        <div className="relative w-full aspect-video rounded-lg overflow-hidden">
          <Image
            src={image}
            alt="tweet media"
            layout="fill"
            objectFit="cover"
          />
        </div>
      )}
      {((comments && comments?.length > 0) || retweets || likes) && (
        <div className="flex gap-4 justify-end">
          {comments && comments.length > 0 && (
            <span className="text-gray-400 text-xs font-medium">
              {comments.length} Comments
            </span>
          )}
          {retweets && retweets > 0 && (
            <span className="text-gray-400 text-xs font-medium">
              {retweets} Retweets
            </span>
          )}
          {likes && likes.length > 0 && (
            <span className="text-gray-400 text-xs font-medium">
              {likes.length} Likes
            </span>
          )}
        </div>
      )}
      <div className="flex border-y border-gray-600 justify-between py-1">
        {[
          {
            icon: <RetweetIcon />,
            label: "Retweet",
            className: "",
            onClick: () => console.log("Retweet"),
            hide: currentUser?.id === author.id,
          },
          {
            icon: <HeartIcon />,
            label: alreadyLiked ? "Liked" : "Like",
            className: alreadyLiked ? "text-red-500" : "",
            onClick: handleLike,
          },
          {
            icon: <BookmarkIcon />,
            label: alreadySaved ? "Saved" : "Bookmark",
            className: alreadySaved ? "text-primary" : "",
            onClick: handleBookmark,
          },
        ]
          .filter((elm) => !elm?.hide)
          .map((elm) => (
            <Button
              key={elm.label}
              variant="transparent"
              className={clsx(
                "flex items-center gap-2 w-full justify-center",
                elm.className
              )}
              onClick={elm.onClick}
            >
              {elm.icon}
              {elm.label}
            </Button>
          ))}
      </div>
      <div className="flex items-start gap-4">
        <Avatar
          src={currentUser?.image || undefined}
          alt={`${currentUser?.name}'s avatar`}
          size="md"
        />
        <form
          className="w-full flex flex-col gap-2 relative rounded overflow-hidden"
          onSubmit={handleSubmit}
        >
          {loading && <LoadingLayer />}
          <Input
            ref={commentInputRef}
            name="comment"
            placeholder="Your Comment"
            className="w-full"
            suffix={
              <>
                <button type="submit">
                  <SendIcon className="text-gray-400 w-5 h-5 hover:text-primary" />
                </button>
                <CommentImageUploader onChange={handleImageUpload} />
              </>
            }
          />
          {imagePreview && (
            <ImagePreview
              file={imagePreview}
              clear={() => setImagePreview(null)}
            />
          )}
        </form>
      </div>
      {comments && comments.length > 0 && (
        <CommentsList comments={comments} tweetId={id} />
      )}
    </div>
  );
};

export default Tweet;
