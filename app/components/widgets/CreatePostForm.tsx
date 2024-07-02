"use client";
import { useRef, useState } from "react";
import { Avatar } from "../elements/Avatar";
import { Button } from "../elements/Button";
import { ImageIcon, WorldIcon, GroupIcon } from "../elements/Icons";
import { Dropdown } from "../elements/Dropdown";
import ImagePreview from "./ImagePreview";
import { uploadImage } from "@/lib/cloudinary";
import { useSession } from "next-auth/react";
import { useQueryClient } from "@tanstack/react-query";

const regx = /[#]\w+/gm;

const ImageInput = ({
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
        className="w-5 cursor-pointer mb-[6px] text-primary"
        onClick={() => imageInputRef.current?.click()}
      />
    </>
  );
};

const CreatePostForm = ({
  avatar,
  name = "user",
}: {
  avatar?: string;
  name?: string;
}) => {
  const [content, setContent] = useState("");
  const textareRef = useRef<HTMLDivElement>(null);

  const session = useSession();

  const queryClient = useQueryClient();

  const [loading, setLoading] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState("Everyone");
  const [imagePreview, setImagePreview] = useState<File | null>();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (content === "") return;

    try {
      setLoading(true);

      const imageUrl = imagePreview ? await uploadImage(imagePreview) : null;

      await fetch(`http://localhost:9090/api/tweets/create`, {
        method: "POST",
        body: JSON.stringify({
          content,
          userId: (session.data?.user as any)?.id,
          image: imageUrl || undefined,
          privite: selectedItem !== "Everyone",
        }),
      });

      setImagePreview(null);
      setContent("");
      if (textareRef.current) textareRef.current.textContent = "";

      queryClient.invalidateQueries({
        queryKey: ["tweets", "getAll", "all"],
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files?.[0];

    if (!file) return;

    setImagePreview(file);
  };

  const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
    setContent(e.currentTarget.innerText as string);
  };

  return (
    <div className="bg-white p-5 flex flex-col gap-6 rounded-lg shadow">
      <p className="text-xs text-gray-100 font-semibold border-b border-gray-500 pb-2">
        Tweet something
      </p>

      <div className="flex gap-4">
        <Avatar src={avatar} alt={`${name}'s avatar`} size="sm" />

        <form className="flex flex-col w-full relative" onSubmit={handleSubmit}>
          <div className="relative overflow-hidden h-fit min-h-[80px]">
            <div
              className="absolute text-base mb-4 top-0 left-0 w-full h-full -z-0 pointer-events-none"
              dangerouslySetInnerHTML={{
                __html: content
                  ? content
                      .replaceAll(
                        regx,
                        (hashtag) =>
                          `<span style="color:#2F80ED">${hashtag}</span>`
                      )
                      .replaceAll("\n", "<br/>")
                  : `<span style="color:#BDBDBD">What’s happening?</span>`,
              }}
            />
            <div
              ref={textareRef}
              contentEditable
              onInput={handleInput}
              className="z-10 h-fit resize-none outline-none ring-none placeholder:text-gray-400 text-base w-full mb-4"
            />
          </div>
          {imagePreview && (
            <ImagePreview
              file={imagePreview}
              clear={() => setImagePreview(null)}
              className="bg-white"
            />
          )}
          <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between">
            <div className="flex items-center gap-4">
              <ImageInput onChange={handleImageUpload} />
              <Dropdown
                Button={
                  <div
                    className="flex items-center gap-2"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  >
                    {selectedItem === "Everyone" ? (
                      <WorldIcon className="text-primary cursor-pointer w-5" />
                    ) : (
                      <GroupIcon className="text-primary cursor-pointer w-5" />
                    )}
                    <span className="text-xs text-primary font-medium">
                      {selectedItem} will see this tweet?
                    </span>
                  </div>
                }
                title="Who can see?"
                description="Choose who can see to this Tweet."
                items={[
                  {
                    label: "Everyone",
                    icon: <WorldIcon />,
                    onClick: () => {
                      setSelectedItem("Everyone");
                      setIsDropdownOpen(false);
                    },
                  },
                  {
                    label: "People you follow",
                    icon: <GroupIcon />,
                    onClick: () => {
                      setSelectedItem("People you follow");
                      setIsDropdownOpen(false);
                    },
                  },
                ]}
              />
            </div>
            <Button
              isLoading={loading}
              className="mb-[6px] ml-auto"
              type="submit"
            >
              Tweet
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePostForm;
