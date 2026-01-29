"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Link } from "lucide-react";
import { useParams } from "next/navigation";

export const GenerateInviteLink = () => {
  const params = useParams();
  const { toast } = useToast();

  const generateLink = () => {
    navigator.clipboard.writeText(
      `${window.location.host}/join?board=${params.board}`,
    );
    toast({
      title: "Invite link copied successfully!",
    });
  };

  return (
    <Button className="w-full md:w-auto" onClick={generateLink}>
      <span className="hidden sm:inline">Generate invite link</span>
      <span className="sm:hidden">Share board</span>
      <Link className="h-4 w-4" />
    </Button>
  );
};
