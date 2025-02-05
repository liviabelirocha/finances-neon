"use client";

import { createTag } from "@/_actions/tags/create";
import { listTags } from "@/_actions/tags/list";
import { Button } from "@/_components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/_components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/_components/ui/popover";
import { cn } from "@/_lib/utils";
import { Tag as DbTag } from "@prisma/client";
import { Check, ChevronsUpDown, LoaderCircle, Plus } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export function Tag({
  defaultValue,
  onChange,
}: {
  defaultValue?: string;
  onChange?: (value: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [search, setSearch] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const [tags, setTags] = useState<DbTag[]>([]);

  async function fetchTags() {
    const data = await listTags(urlParams.board as string);
    setTags(data);

    if (defaultValue)
      setValue(data.find((tag) => tag.id === defaultValue)?.name ?? "");
  }

  useEffect(() => {
    fetchTags();
  }, []);

  const urlParams = useParams();

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? tags.find((tag) => tag.name === value)?.name
            : "Select tag..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput
            placeholder="Search tag..."
            value={search}
            onInput={(e) => setSearch(e.currentTarget.value)}
          />
          <CommandList>
            <CommandEmpty>
              <Button
                className="w-full whitespace-nowrap"
                type="button"
                disabled={isLoading}
                onClick={async () => {
                  setIsLoading(true);

                  await createTag({
                    boardId: urlParams.board as string,
                    name: search,
                  });

                  await fetchTags();

                  setSearch("");
                  setIsLoading(false);
                }}
              >
                {isLoading ? "Creating" : "Create"} &quot;{search}&quot;
                {isLoading ? (
                  <LoaderCircle className="animate-spin" />
                ) : (
                  <Plus />
                )}
              </Button>
            </CommandEmpty>
            <CommandGroup>
              {tags.map((tag) => (
                <CommandItem
                  key={tag.id}
                  value={tag.name}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);

                    console.log(currentValue);
                    console.log(
                      tags.find((tag) => tag.name === currentValue)?.id ?? "",
                    );

                    onChange?.(
                      tags.find((tag) => tag.name === currentValue)?.id ?? "",
                    );

                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === tag.name ? "opacity-100" : "opacity-0",
                    )}
                  />
                  {tag.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
