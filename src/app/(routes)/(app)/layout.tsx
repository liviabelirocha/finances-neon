import { Navbar } from "@/_components/navbar";
import { auth } from "@/_lib/auth";
import { PropsWithChildren } from "react";

export default async function Layout({ children }: PropsWithChildren) {
  await auth();

  return (
    <>
      <Navbar />
      <div className="m-6">{children}</div>
    </>
  );
}
