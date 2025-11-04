"use server";

import { auth as clerkAuth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export const auth = async (redirectTo?: string) => {
  const data = await clerkAuth();

  if (!data.userId)
    redirect(`/login${redirectTo ? `?redirectTo=${redirectTo}` : ""}`);

  return data;
};
