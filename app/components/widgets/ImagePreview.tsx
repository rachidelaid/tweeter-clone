import Image from "next/image";

import { TrashIcon } from "../elements/Icons";
import clsx from "clsx";

const ImagePreview = ({
  file,
  clear,
  className = "",
}: {
  file: File;
  clear: () => void;
  className?: string;
}) => {
  return (
    <div className={clsx("bg-gray-700 rounded p-2", className)}>
      <div className="p-2 relative w-full md:w-1/2">
        <div className="relative w-full aspect-video rounded overflow-hidden">
          <Image
            src={URL.createObjectURL(file)}
            layout="fill"
            objectFit="cover"
            alt="image preview"
          />
        </div>
        <button
          className="hover:bg-red delay-75 group border hover:scale-110 bg-white border-red rounded-full p-0.5 absolute top-0 right-0 transition-all"
          onClick={() => clear()}
          type="button"
        >
          <TrashIcon className="text-red group-hover:text-white w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default ImagePreview;
