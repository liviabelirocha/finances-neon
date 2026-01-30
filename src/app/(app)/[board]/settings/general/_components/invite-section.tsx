"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Link, UserPlus } from "lucide-react";

export const InviteSection = ({ boardId }: { boardId: string }) => {
  const { toast } = useToast();

  const copyInviteLink = () => {
    navigator.clipboard.writeText(
      `${window.location.origin}/join?board=${boardId}`,
    );
    toast({
      title: "Invite link copied!",
    });
  };

  return (
    <Button variant="outline" size="sm" onClick={copyInviteLink}>
      <UserPlus className="mr-1 h-4 w-4" />
      <span className="hidden sm:inline">Invite</span>
      <Link className="h-4 w-4 sm:hidden" />
    </Button>
  );
};
