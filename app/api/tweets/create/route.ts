import { z } from "zod";
import prisma from "@/lib/prisma";

const bodySchema = z.object({
  userId: z.string(),
  content: z.string(),
  image: z.string().optional(),
  privite: z.boolean(),
  hashtags: z.array(z.string()).optional(),
});

export const POST = async (req: Request) => {
  const body = await req.json();

  try {
    bodySchema.parse(body);
  } catch (error) {
    return Response.json({ error: "Unprocessable Content" }, { status: 422 });
  }

  const { userId, content, image, privite } = body as z.infer<
    typeof bodySchema
  >;

  try {
    const data: any = {
      content,
      authorId: userId,
      privite,
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

    const tweet = await prisma.tweet.create({ data });

    //add hashtags
    const regx = /[#]\w+/gm;
    const hashtags = content.match(regx);

    if (hashtags?.length) {
      for (const hashtag of hashtags) {
        const hashtagExists = await prisma.hashtag.findUnique({
          where: {
            name: hashtag,
          },
        });

        if (hashtagExists) {
          await prisma.hashtag.update({
            where: {
              id: hashtagExists.id,
            },
            data: {
              tweets: {
                connect: {
                  id: tweet.id,
                },
              },
            },
          });
        } else {
          await prisma.hashtag.create({
            data: {
              name: hashtag,
              tweets: {
                connect: {
                  id: tweet.id,
                },
              },
            },
          });
        }
      }
    }

    return Response.json(tweet, { status: 201 });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
};
