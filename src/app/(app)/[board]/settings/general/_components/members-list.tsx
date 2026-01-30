"use client";

import { leaveBoard } from "@/actions/board/leave";
import { removeBoardMember } from "@/actions/board/remove-member";
import type { BoardMember } from "@/actions/board/get-members";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { LogOut } from "lucide-react";
import Image from "next/image";
import { useState, useTransition } from "react";
import { InviteSection } from "./invite-section";

export const MembersList = ({
  boardId,
  members,
  memberCount,
}: {
  boardId: string;
  members: BoardMember[];
  memberCount: number;
}) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0">
      <div>
        <CardTitle className="text-lg">Members ({memberCount})</CardTitle>
        <CardDescription>People with access to this board</CardDescription>
      </div>
      <InviteSection boardId={boardId} />
    </CardHeader>
    <CardContent>
      <div className="space-y-3">
        {members.map((member) => (
          <MemberItem
            key={member.id}
            boardId={boardId}
            member={member}
            isLastMember={memberCount <= 1}
          />
        ))}
      </div>
    </CardContent>
  </Card>
);

const MemberItem = ({
  boardId,
  member,
  isLastMember,
}: {
  boardId: string;
  member: BoardMember;
  isLastMember: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const displayName =
    member.firstName || member.lastName
      ? `${member.firstName ?? ""} ${member.lastName ?? ""}`.trim()
      : member.email;

  const handleRemove = () => {
    startTransition(async () => {
      try {
        await removeBoardMember({ boardId, userId: member.id });
        setIsOpen(false);
        toast({ title: `${displayName} has been removed from the board` });
      } catch {
        toast({
          title: "Failed to remove member",
          variant: "destructive",
        });
      }
    });
  };

  const handleLeave = () => {
    startTransition(async () => {
      try {
        await leaveBoard(boardId);
      } catch (error) {
        toast({
          title:
            error instanceof Error ? error.message : "Failed to leave board",
          variant: "destructive",
        });
        setIsOpen(false);
      }
    });
  };

  return (
    <div className="flex items-center justify-between rounded-md p-2 hover:bg-accent/50">
      <div className="flex items-center gap-3">
        <Image
          src={member.imageUrl}
          alt={displayName}
          width={32}
          height={32}
          className="rounded-full"
        />
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">{displayName}</span>
            {member.isCurrentUser && <Badge className="text-xs">You</Badge>}
          </div>
          {member.firstName && member.email && (
            <span className="text-xs text-muted-foreground">
              {member.email}
            </span>
          )}
        </div>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-destructive"
            disabled={isLastMember}
          >
            <LogOut className="mr-1 h-4 w-4" />
            {member.isCurrentUser ? "Leave" : "Remove"}
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {member.isCurrentUser
                ? "Leave this board?"
                : `Remove ${displayName}?`}
            </DialogTitle>
            <DialogDescription>
              {member.isCurrentUser
                ? "You will lose access to all transactions and data in this board. This action cannot be undone."
                : "This person will lose access to the board and all its data."}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="ghost" disabled={isPending}>
                Cancel
              </Button>
            </DialogClose>
            <Button
              variant="destructive"
              onClick={member.isCurrentUser ? handleLeave : handleRemove}
              disabled={isPending}
            >
              {member.isCurrentUser ? "Leave Board" : "Remove"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
