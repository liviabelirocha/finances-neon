import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { SignInButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { LogInIcon } from "lucide-react";
import { redirect } from "next/navigation";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: { redirectTo?: string };
}) {
  const { userId } = await auth();

  if (userId) redirect(searchParams.redirectTo || "/");

  return (
    <div className="mx-auto flex h-full max-w-md flex-col justify-center px-4 py-8 sm:p-8">
      <Logo />

      <h1 className="mb-3 text-2xl font-bold sm:text-4xl">Welcome</h1>
      <p className="mb-6 text-sm text-muted-foreground sm:mb-8 sm:text-base">
        Finances Neon is a financial management platform.
      </p>
      <SignInButton>
        <Button variant="outline">
          <LogInIcon className="mr-2" />
          Sign in or create account
        </Button>
      </SignInButton>
    </div>
  );
}
