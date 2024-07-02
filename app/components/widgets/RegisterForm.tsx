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
  username: string;
  name: string;
  email: string;
  password: string;
  re_password: string;
  csrfToken: string;
};

const nameSchema = z.string().min(3).max(100);
const usernameSchema = z.string().regex(/^[a-zA-Z0-9_]{3,15}$/);
const emailSchema = z.string().email();
const password = z.string().min(6).max(100);

const RegisterForm = ({ csrfToken }: { csrfToken?: string }) => {
  const router = useRouter();
  const [bigError, setBigError] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({ mode: "onChange" });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (data.password !== data.re_password) {
      setBigError("passwords are not the same");
      return;
    }

    try {
      setLoading(true);
      const resp = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const json = await resp.json();

      if (json.error) {
        setBigError(
          typeof json.error === "string" ? json.error : json.error.json(", ")
        );
        return;
      }

      const result = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      });

      if (result?.error) {
        setBigError("email or password is invalid");
        return;
      }

      setBigError("");

      router.push("/");
    } catch (error) {
      console.log("error from register", error);
      setBigError("something went wrong");
    } finally {
      setLoading(false);
    }
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
          type="text"
          placeholder="Full Name"
          {...register("name", {
            required: true,
            validate: (value) => nameSchema.safeParse(value).success,
          })}
          error={errors.email ? "name is invalid" : undefined}
        />
        <Input
          type="text"
          placeholder="Username"
          {...register("username", {
            required: true,
            validate: (value) => usernameSchema.safeParse(value).success,
          })}
          error={errors.email ? "Username is invalid" : undefined}
        />
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
        <Input
          type="password"
          placeholder="Confirm Password"
          {...register("re_password", {
            required: true,
            validate: (value) => password.safeParse(value).success,
          })}
          error={
            errors.password ? "Password confirmation is not correct" : undefined
          }
        />
        <Button type="submit" isLoading={loading}>
          Register
        </Button>
      </form>
    </>
  );
};

export default RegisterForm;
