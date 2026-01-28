"use client";

import { UserButton } from "@clerk/nextjs";
import { useParams } from "next/navigation";
import { Logo } from "../logo";
import { GenerateInviteLink } from "./components/generate-invite-link";
import { NavLinks } from "./components/nav-links";
import { MobileSheet } from "./components/mobile-sheet";

export const Navbar = () => {
  const params = useParams();

  return (
    <nav className="flex justify-between border-b border-solid px-4 py-3 md:px-8 md:py-4">
      <div className="flex items-center gap-4 md:gap-10">
        <Logo />
        <div className="hidden md:flex md:items-center md:gap-10">
          <NavLinks />
        </div>
      </div>

      <div className="hidden md:flex md:items-center md:gap-4">
        {params.board && <GenerateInviteLink />}
        <UserButton showName />
      </div>

      <MobileSheet />
    </nav>
  );
};
