"use client";
import { signIn } from "next-auth/react";
import { z } from "zod";
import Image from "next/image";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "../elements/Button";
import { Input } from "../elements/Input";
import { useState } from "react";
import { useRouter } from "next/navigation";

type Inputs = {
  email: string;
  password: string;
  csrfToken: string;
};

const emailSchema = z.string().email();
const password = z.string().min(6).max(100);

const LoginForm = ({ csrfToken }: { csrfToken?: string }) => {
  const router = useRouter();
  const [bigError, setBigError] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm<Inputs>({ mode: "onChange" });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoading(true);

    const result = await signIn("credentials", {
      redirect: false,
      ...data,
    });

    setLoading(false);

    if (result?.error) {
      setBigError("email or password is invalid");
      return;
    }

    setBigError("");

    router.push("/");
  };

  return (
    <>
      <p className="text-xs text-red-500 h-5">{bigError}</p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center gap-6 bg-white rounded-md p-6 shadow w-full mx-6 md:w-96"
      >
        <Image src="/twitter.svg" width={50} height={50} alt="logo" />
        <input type="hidden" value={csrfToken} {...register("csrfToken")} />
        <Input
          type="email"
          placeholder="Email"
          {...register("email", {
            required: true,
            validate: (value) => emailSchema.safeParse(value).success,
          })}
          error={errors.email ? "Email is invalid" : undefined}
        />
        <Input
          type="password"
          placeholder="Password"
          {...register("password", {
            required: true,
            validate: (value) => password.safeParse(value).success,
          })}
          error={errors.password ? "Password is invalid" : undefined}
        />
        <Button type="submit" isLoading={loading}>
          Sign in
        </Button>
      </form>
    </>
  );
};

export default LoginForm;
