import { z } from "zod";
import prisma from "@/lib/prisma";

const bodySchema = z.object({
  userId: z.string(),
  tweetId: z.string(),
  content: z.string(),
  image: z.string().optional(),
});

export const POST = async (req: Request) => {
  const body = await req.json();

  try {
    bodySchema.parse(body);
  } catch (error) {
    return Response.json({ error: "Unprocessable Content" }, { status: 422 });
  }

  const { userId, tweetId, content, image } = body as z.infer<
    typeof bodySchema
  >;

  const data: any = {
    content,
    authorId: userId,
    tweetId,
  };

  if (image) {
    const media = await prisma.media.create({
      data: {
        url: image,
      },
    });

    data.Media = {
      connect: {
        id: media.id,
      },
    };
  }

  const comment = await prisma.comment.create({
    data,
  });

  return Response.json(comment, { status: 201 });
};
