import { Logo } from "@/_components/logo";
import { Button } from "@/_components/ui/button";
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
    <div className="mx-auto flex h-full flex-col justify-center p-8">
      <Logo />

      <h1 className="mb-3 text-4xl font-bold">Welcome</h1>
      <p className="mb-8 text-muted-foreground">
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
