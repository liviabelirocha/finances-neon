"use client";

import { removeIntegration } from "@/actions/integrations/remove";
import { saveIntegration } from "@/actions/integrations/save";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { LoaderCircle } from "lucide-react";
import { useState, useTransition } from "react";

export const IntegrationCard = ({
  boardId,
  title,
  description,
  configured,
  last4,
}: {
  boardId: string;
  title: string;
  description: React.ReactNode;
  configured: boolean;
  last4: string | null;
}) => {
  const [apiKey, setApiKey] = useState("");
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const handleSave = () => {
    if (!apiKey.trim()) return;

    startTransition(async () => {
      try {
        const { success } = await saveIntegration({ boardId, apiKey });

        if (!success) {
          toast({
            title: "Invalid API key",
            description: `${title} rejected this key.`,
            variant: "destructive",
          });
          return;
        }

        setApiKey("");
        toast({ title: `${title} key saved` });
      } catch {
        toast({
          title: "Failed to save key",
          description: `Couldn't reach ${title}. Try again in a moment.`,
          variant: "destructive",
        });
      }
    });
  };

  const handleRemove = () => {
    startTransition(async () => {
      try {
        await removeIntegration(boardId);
        toast({ title: `${title} key removed` });
      } catch {
        toast({
          title: "Failed to remove key",
          variant: "destructive",
        });
      }
    });
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between gap-2">
          <CardTitle className="text-lg">{title}</CardTitle>
          {configured && last4 ? (
            <Badge>Connected ••••{last4}</Badge>
          ) : configured ? (
            <Badge variant="destructive">Unreadable — replace key</Badge>
          ) : (
            <Badge variant="outline">Not configured</Badge>
          )}
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-2 sm:flex-row">
        <Input
          type="password"
          autoComplete="off"
          placeholder={configured ? "Paste a new key to replace" : "API key"}
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSave();
          }}
          disabled={isPending}
        />
        <div className="flex gap-2">
          <Button onClick={handleSave} disabled={isPending || !apiKey.trim()}>
            Save
            {isPending && <LoaderCircle className="animate-spin" />}
          </Button>
          {configured && (
            <Button variant="ghost" onClick={handleRemove} disabled={isPending}>
              Remove
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
