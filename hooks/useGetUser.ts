import prisma from "@/lib/prisma";

const useGetUser = async (username: string) => {
  return await prisma.user.findUnique({
    where: { username },
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

export default useGetUser;
