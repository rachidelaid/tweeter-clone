import LoginForm from "@/app/components/widgets/LoginForm";
import { getCsrfToken } from "next-auth/react";
import Link from "next/link";

const SignInPage = async () => {
  const csrfToken = await getCsrfToken();

  return (
    <div className="flex flex-col h-screen w-screen justify-center items-center px-4">
      <LoginForm csrfToken={csrfToken} />
      <p className="mt-2 text-xs text-gray-300">
        you don&apos;t have an account ?{" "}
        <Link href="/signup" className="text-primary hover:underline">
          create one
        </Link>
      </p>
    </div>
  );
};

export default SignInPage;
