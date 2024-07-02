import React from "react";
import { Button } from "./components/elements/Button";
import Link from "next/link";

const Page = () => {
  return (
    <div className="flex h-screen justify-center items-center flex-col">
      <h1 className="text-primary text-[40px] font-bold">404</h1>
      <p className="text-gray-200 text-md">Page not found</p>
      <Link href="/">
        <Button className="mt-8">Go Home</Button>
      </Link>
    </div>
  );
};

export default Page;
