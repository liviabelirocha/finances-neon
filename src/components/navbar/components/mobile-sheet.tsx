import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { UserButton } from "@clerk/nextjs";
import { Menu } from "lucide-react";
import { GenerateInviteLink } from "./generate-invite-link";
import { NavLinks } from "./nav-links";
import { useParams } from "next/navigation";
import { useState } from "react";

export const MobileSheet = () => {
  const params = useParams();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <div className="flex items-center gap-2 md:hidden">
        <UserButton />
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setMobileMenuOpen(true)}
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>

      <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
        <SheetContent side="left">
          <SheetHeader>
            <SheetTitle>
              <Logo />
            </SheetTitle>
          </SheetHeader>
          <div className="mt-6 flex flex-col gap-4">
            <NavLinks onNavigate={() => setMobileMenuOpen(false)} />
            {params.board && (
              <div className="mt-4 border-t pt-4">
                <GenerateInviteLink />
              </div>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};
