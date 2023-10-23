import { getCsrfToken } from "next-auth/react";
import Link from "next/link";
import RegisterForm from "../components/widgets/RegisterForm";

const SignUpPage = async () => {
  const csrfToken = await getCsrfToken();

  return (
    <div className="flex flex-col h-screen w-screen justify-center items-center">
      <RegisterForm csrfToken={csrfToken} />
      <p className="mt-2 text-xs text-gray-300">
        you already have an account ?{" "}
        <Link href="/signin" className="text-primary hover:underline">
          sign in
        </Link>
      </p>
    </div>
  );
};

export default SignUpPage;
