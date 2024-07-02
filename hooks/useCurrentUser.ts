import { getSessionServerSide } from "@/lib/getSessionServerSide";
import prisma from "@/lib/prisma";

const useCurrentUser = async () => {
  const session = await getSessionServerSide();

  return await prisma.user.findUnique({
    where: { id: session?.user?.id.toString() },
    select: {
      id: true,
      name: true,
      username: true,
      avatar: {
        select: {
          url: true,
        },
      },
      bio: true,
      Profile: {
        select: {
          banner: {
            select: {
              url: true,
            },
          },
        },
      },
    },
  });
};

export default useCurrentUser;
