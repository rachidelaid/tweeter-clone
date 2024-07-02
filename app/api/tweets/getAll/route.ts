import prisma from "@/lib/prisma";
import { z } from "zod";

const bodySchema = z.object({
  userId: z.string().optional(),
});

export const POST = async (req: Request) => {
  const body = await req.json();

  try {
    bodySchema.parse(body);
  } catch (error) {
    return Response.json({ error: "Unprocessable Content" }, { status: 422 });
  }

  const { userId } = body as z.infer<typeof bodySchema>;

  const schema = {
    where: userId
      ? {
          authorId: userId,
        }
      : undefined,
    orderBy: {
      createdAt: "desc",
    },
  } as const;

  const tweets = await prisma.tweet.findMany(schema);

  return Response.json(tweets, { status: 200 });
};

//TODO: add pagination with lazy loading
