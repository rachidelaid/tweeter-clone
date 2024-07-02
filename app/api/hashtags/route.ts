import prisma from "@/lib/prisma";
import { z } from "zod";

const bodySchema = z.object({
  term: z.string(),
});

export const POST = async (req: Request) => {
  const body = await req.json();

  try {
    bodySchema.parse(body);
  } catch (error) {
    return Response.json({ error: "Unprocessable Content" }, { status: 422 });
  }

  const { term } = body as z.infer<typeof bodySchema>;

  const hashtags = await prisma.hashtag.findMany({
    where: {
      name: {
        startsWith: term,
      },
    },
  });

  return Response.json(hashtags);
};
