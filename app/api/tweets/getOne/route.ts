import { z } from "zod";
import prisma from "@/lib/prisma";

const bodySchema = z.object({
  tweetId: z.string(),
});

export const POST = async (req: Request, res: Response) => {
  const body = await req.json();

  try {
    bodySchema.parse(body);
  } catch (error) {
    return Response.json({ error: "Unprocessable Content" }, { status: 422 });
  }

  const { tweetId } = body as z.infer<typeof bodySchema>;

  const tweet = await prisma.tweet.findUnique({
    where: {
      id: tweetId,
    },
    include: {
      Media: {
        select: {
          url: true,
        },
      },
      author: {
        select: {
          id: true,
          name: true,
          avatar: {
            select: {
              url: true,
            },
          },
        },
      },
      comments: {
        orderBy: {
          createdAt: "desc",
        },
        select: {
          id: true,
          content: true,
          createdAt: true,
          Media: {
            select: {
              url: true,
            },
          },
          author: {
            select: {
              name: true,
              avatar: {
                select: {
                  url: true,
                },
              },
            },
          },
          likes: {
            select: {
              id: true,
              author: {
                select: {
                  id: true,
                  name: true,
                  avatar: {
                    select: {
                      url: true,
                    },
                  },
                },
              },
            },
          },
        },
      },
      likes: {
        select: {
          id: true,
          author: {
            select: {
              id: true,
            },
          },
        },
      },
      bookmarks: {
        select: {
          id: true,
          authorId: true,
        },
      },
    },
  });

  if (!tweet) {
    return Response.json({ error: "Tweet not found" }, { status: 404 });
  }

  return Response.json(tweet, { status: 200 });
};
