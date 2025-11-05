"use client";

import { addBulkTransactions } from "@/actions/add-bulk-transactions";
import { useToast } from "@/hooks/use-toast";
import { LoaderCircle } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";
import { Button } from "../ui/button";
import { DataTable } from "../ui/data-table";
import { Dialog, DialogClose, DialogContent, DialogFooter } from "../ui/dialog";
import { FileInput } from "./file-input";
import { FileSpecs } from "./file-specs";
import { ParsedFile } from "./parse-data";
import { columns } from "./table";

export const CsvReader = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [file, setFile] = useState<ParsedFile>({ data: [], errors: [] });

  const params = useParams();

  const { toast } = useToast();

  const handleImport = async () => {
    try {
      setIsUploading(true);
      await addBulkTransactions({
        transactions: file.data,
        boardId: params.board as string,
      });

      toast({
        title: "File imported successfully",
      });
    } catch (error) {
      console.error(error);

      toast({
        title: "Oops, something went wrong!",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
      setFile({ data: [], errors: [] });
      setIsOpen(false);
    }
  };

  return (
    <Dialog
      onOpenChange={(open) => {
        if (!open) setFile({ data: [], errors: [] });
        setIsOpen(open);
      }}
      open={isOpen}
    >
      <DialogContent className="max-w-[600px]">
        <FileSpecs />

        {!file.data.length && <FileInput onUpload={setFile} />}

        {!!file.data.length && <DataTable columns={columns} data={file.data} />}

        {!!file.errors.length && (
          <div className="flex flex-col gap-2 rounded bg-red-600 p-2">
            <strong>These rows had an error while being processed:</strong>
            <ul className="list-disc pl-6">
              {file.errors.map((error, idx) => (
                <li key={idx}>{error}</li>
              ))}
            </ul>
          </div>
        )}

        <DialogFooter>
          <DialogClose>
            <Button variant="ghost">Cancel</Button>
          </DialogClose>
          <Button
            onClick={handleImport}
            disabled={!file.data.length || isUploading}
          >
            Upload file
            {isUploading && <LoaderCircle className="animate-spin" />}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
