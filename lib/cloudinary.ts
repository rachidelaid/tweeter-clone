export const uploadImage = async (file: File | undefined) => {
  if (!file) return null;

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "tweeter");

  try {
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!res.ok) throw new Error("Something went wrong while uploading image");

    const data = await res.json();
    return data.secure_url as string;
  } catch (error) {
    console.log(error);
    return null;
  }
};
