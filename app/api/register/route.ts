import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import { z } from "zod";

const RegisterSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string(),
  username: z.string(),
});

export const POST = async (req: Request) => {
  const body = await req.json();

  try {
    RegisterSchema.parse(body);
  } catch {
    return Response.json({ error: "Unprocessable Content" }, { status: 422 });
  }

  const { email, password, name, username } = body;

  try {
    const user = await prisma.user.create({
      data: {
        name,
        username,
        email,
        password: await bcrypt.hash(password, 10),
      },
    });

    return Response.json(user, { status: 201 });
  } catch (error: any) {
    if (!error?.meta?.target)
      return Response.json(
        {
          error: "Something went wrong",
        },
        { status: 500 }
      );

    const targets = error.meta.target as string[];
    return Response.json(
      {
        error: targets.map((t) => `invalid ${t}`),
      },
      {
        status: 422,
      }
    );
  }
};
