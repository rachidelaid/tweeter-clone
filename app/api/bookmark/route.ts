import { z } from "zod";
import prisma from "@/lib/prisma";

const bookmarkSchema = z.object({
  userId: z.string(),
  tweetId: z.string(),
});

const unBookmarkSchema = z.object({
  id: z.string(),
});

export const POST = async (req: Request) => {
  const body = await req.json();

  try {
    bookmarkSchema.parse(body);
  } catch (error) {
    return Response.json({ error: "Unprocessable Content" }, { status: 422 });
  }

  const { userId, tweetId } = body as z.infer<typeof bookmarkSchema>;

  const bookmark = await prisma.bookmark.create({
    data: {
      authorId: userId,
      tweetId,
    },
  });

  return Response.json(bookmark, { status: 201 });
};

export const DELETE = async (req: Request) => {
  const body = await req.json();

  try {
    unBookmarkSchema.parse(body);
  } catch (error) {
    return Response.json({ error: "Unprocessable Content" }, { status: 422 });
  }

  const { id } = body as z.infer<typeof unBookmarkSchema>;

  await prisma.bookmark.delete({
    where: {
      id,
    },
  });

  return Response.json({ success: true }, { status: 200 });
};
