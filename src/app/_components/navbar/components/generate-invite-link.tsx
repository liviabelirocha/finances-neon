"use client";

import { Button } from "@/_components/ui/button";
import { useToast } from "@/_hooks/use-toast";
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
    <Button onClick={generateLink}>
      Generate invite link <Link />
    </Button>
  );
};
