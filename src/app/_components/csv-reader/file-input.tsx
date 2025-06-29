import { useToast } from "@/_hooks/use-toast";
import { FolderUp } from "lucide-react";
import CSVReader from "react-csv-reader";
import { ParsedFile, parseFile, RawFileRow } from "./parse-data";

export const FileInput = ({
  onUpload,
}: {
  onUpload: (file: ParsedFile) => void;
}) => {
  const { toast } = useToast();

  const handleUpload = (rawFile: RawFileRow[]) => {
    const { data, errors } = parseFile(rawFile);

    if (!data.length) {
      toast({ title: "Oops, something went wrong", variant: "destructive" });
      return;
    }

    onUpload({ data, errors });
  };

  return (
    <label className="flex cursor-pointer flex-col items-center justify-center rounded-md border-2 border-dashed border-gray-300 p-4">
      <FolderUp size={32} />
      Click or drag file to this area to upload
      <CSVReader
        accept="text/csv"
        onFileLoaded={handleUpload}
        parserOptions={{
          dynamicTyping: true,
          skipEmptyLines: true,
        }}
        inputStyle={{
          opacity: 0,
          position: "absolute",
        }}
      />
    </label>
  );
};
