import { Navbar } from "@/components/navbar";
import { auth } from "@/lib/auth";
import { Provider as TooltipProvider } from "@radix-ui/react-tooltip";
import { headers } from "next/headers";
import { PropsWithChildren } from "react";

export default async function Layout({ children }: PropsWithChildren) {
  const headerList = headers();

  const currentPath = headerList.get("x-current-path");
  const isJoin = currentPath?.includes("/join");

  await auth(isJoin && currentPath ? currentPath : undefined);

  return (
    <TooltipProvider>
      <Navbar />
      <div className="flex-flex-col m-6 h-full overflow-hidden">{children}</div>
    </TooltipProvider>
  );
}
