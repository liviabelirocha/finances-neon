"use server";

import { auth as clerkAuth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export const auth = async () => {
  const data = await clerkAuth();

  if (!data.userId) redirect("/login");

  return data;
};
