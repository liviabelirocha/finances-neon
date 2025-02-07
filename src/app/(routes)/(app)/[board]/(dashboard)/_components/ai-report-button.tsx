"use client";

import { generateAiReport } from "@/_actions/generate-ai-report";
import { Button } from "@/_components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/_components/ui/dialog";
import { ScrollArea } from "@/_components/ui/scroll-area";
import { useToast } from "@/_hooks/use-toast";
import { BotIcon, LoaderCircle } from "lucide-react";
import { useState } from "react";
import Markdown from "react-markdown";

export const AiReportButton = ({
  boardId,
  month,
  year,
}: {
  month: number;
  year: number;
  boardId: string;
}) => {
  const [report, setReport] = useState<string | null>(null);
  const [reportIsLoading, setReportIsLoading] = useState(false);

  const { toast } = useToast();

  const handleGenerateReportClick = async () => {
    try {
      setReportIsLoading(true);
      const aiReport = await generateAiReport({
        boardId,
        month,
        year,
      });

      setReport(aiReport);
    } catch (error) {
      console.error(error);

      toast({
        title: "Oops, something went wrong!",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setReportIsLoading(false);
    }
  };

  return (
    <Dialog
      onOpenChange={(open) => {
        if (!open) setReport(null);
      }}
    >
      <DialogTrigger asChild>
        <Button variant="ghost" className="font-bold">
          AI Report
          <BotIcon />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[600px]">
        <DialogHeader>
          <DialogTitle>AI Report</DialogTitle>
          <DialogDescription>
            Use AI to generate a report with insights on your finances.
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="prose max-h-[450px] text-white prose-h3:text-white prose-h4:text-white prose-strong:text-white">
          <Markdown>{report}</Markdown>
        </ScrollArea>

        <DialogFooter>
          <DialogClose>
            <Button variant="ghost">Cancel</Button>
          </DialogClose>
          <Button
            onClick={handleGenerateReportClick}
            disabled={reportIsLoading}
          >
            Generate report
            {reportIsLoading && <LoaderCircle className="animate-spin" />}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
