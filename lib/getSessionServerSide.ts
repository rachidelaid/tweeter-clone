import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

interface Session {
  user: {
    id: number;
    name: string;
    email: string;
    image: string;
    username: string;
  };
}

export const getSessionServerSide = async () => {
  const session: Session | null = await getServerSession(authOptions);

  return session;
};
