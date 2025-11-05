"use client";

import { UserButton } from "@clerk/nextjs";
import { useParams } from "next/navigation";
import { Logo } from "../logo";
import { ActiveLink } from "./components/active-link";
import { GenerateInviteLink } from "./components/generate-invite-link";

export const Navbar = () => {
  const params = useParams();

  return (
    <nav className="flex justify-between border-b border-solid px-8 py-4">
      <div className="flex items-center gap-10">
        <Logo />
        <ActiveLink href="/">Boards</ActiveLink>
        {params.board && (
          <>
            <ActiveLink href={`/${params.board}`} passSearch>
              Dashboard
            </ActiveLink>
            <ActiveLink href={`/${params.board}/transactions`} passSearch>
              Transactions
            </ActiveLink>
          </>
        )}
      </div>
      <div className="flex items-center gap-4">
        {params.board && <GenerateInviteLink />}
        <UserButton showName />
      </div>
    </nav>
  );
};
