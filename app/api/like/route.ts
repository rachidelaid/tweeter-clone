import prisma from "@/lib/prisma";
import { z } from "zod";

const likeSchema = z.object({
  commentId: z.string().optional(),
  tweetId: z.string().optional(),
  userId: z.string(),
});

const unlikeSchema = z.object({
  likeId: z.string(),
});

export const DELETE = async (req: Request, res: Response) => {
  const body = await req.json();

  try {
    unlikeSchema.parse(body);
  } catch {
    return Response.json({ error: "Unprocessable Content" }, { status: 422 });
  }

  const { likeId } = body as z.infer<typeof unlikeSchema>;

  try {
    const like = await prisma.like.delete({
      where: {
        id: likeId,
      },
    });

    return Response.json(like, { status: 201 });
  } catch (error: any) {
    return Response.json(
      {
        error: "Something went wrong",
      },
      { status: 500 }
    );
  }
};

export const POST = async (req: Request, res: Response) => {
  const body = await req.json();

  try {
    likeSchema.parse(body);
  } catch {
    return Response.json({ error: "Unprocessable Content" }, { status: 422 });
  }

  const { commentId, userId, tweetId } = body as z.infer<typeof likeSchema>;

  try {
    const like = await prisma.like.create({
      data: {
        commentId,
        tweetId,
        authorId: userId,
      },
    });

    return Response.json(like, { status: 201 });
  } catch (error: any) {
    return Response.json(
      {
        error: "Something went wrong",
      },
      { status: 500 }
    );
  }
};
