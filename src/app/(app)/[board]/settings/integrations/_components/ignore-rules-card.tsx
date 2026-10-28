"use client";

import { saveIgnoreRules } from "@/actions/integrations/save-ignore-rules";
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
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown, LoaderCircle, X } from "lucide-react";
import { useState, useTransition } from "react";

type Option = { id: number; name: string };

const IgnoreSelect = ({
  label,
  placeholder,
  options,
  selected,
  onChange,
}: {
  label: string;
  placeholder: string;
  options: Option[];
  selected: number[];
  onChange: (selected: number[]) => void;
}) => {
  const [open, setOpen] = useState(false);

  const selectedOptions = options.filter((option) =>
    selected.includes(option.id),
  );

  const toggle = (id: number) =>
    onChange(
      selected.includes(id)
        ? selected.filter((selectedId) => selectedId !== id)
        : [...selected, id],
    );

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between font-normal"
          >
            {selected.length ? `${selected.length} selected` : placeholder}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-[--radix-popover-trigger-width] p-0"
          align="start"
        >
          <Command>
            <CommandInput placeholder={`Search ${label.toLowerCase()}...`} />
            <CommandList>
              <CommandEmpty>Nothing found.</CommandEmpty>
              <CommandGroup>
                {options.map((option) => (
                  <CommandItem
                    key={option.id}
                    value={option.name}
                    onSelect={() => toggle(option.id)}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        selected.includes(option.id)
                          ? "opacity-100"
                          : "opacity-0",
                      )}
                    />
                    {option.name}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      {selectedOptions.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {selectedOptions.map((option) => (
            <Badge key={option.id} className="gap-1">
              {option.name}
              <button
                type="button"
                aria-label={`Stop ignoring ${option.name}`}
                onClick={() => toggle(option.id)}
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
};

export const IgnoreRulesCard = ({
  boardId,
  budgets,
  tags,
  budgetIds: initialBudgetIds,
  tagIds: initialTagIds,
}: {
  boardId: string;
  budgets: Option[];
  tags: Option[];
  budgetIds: number[];
  tagIds: number[];
}) => {
  const [budgetIds, setBudgetIds] = useState(initialBudgetIds);
  const [tagIds, setTagIds] = useState(initialTagIds);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const save = (rules: { budgetIds: number[]; tagIds: number[] }) => {
    const previous = { budgetIds, tagIds };

    setBudgetIds(rules.budgetIds);
    setTagIds(rules.tagIds);

    startTransition(async () => {
      try {
        await saveIgnoreRules({ boardId, ...rules });
      } catch {
        setBudgetIds(previous.budgetIds);
        setTagIds(previous.tagIds);
        toast({ title: "Failed to save ignore rules", variant: "destructive" });
      }
    });
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between gap-2">
          <CardTitle className="text-lg">Daily budget rules</CardTitle>
          {isPending && <LoaderCircle className="h-4 w-4 animate-spin" />}
        </div>
        <CardDescription>
          Transactions in the savings metas count as saved, like money moved to
          investments. Transactions with the ignored tags are left out entirely,
          like reimbursements. Neither counts as spending or income here, and
          AUVP keeps counting them as usual.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4 sm:grid-cols-2">
        <IgnoreSelect
          label="Savings metas"
          placeholder="Select metas..."
          options={budgets}
          selected={budgetIds}
          onChange={(selected) => save({ budgetIds: selected, tagIds })}
        />
        <IgnoreSelect
          label="Ignored tags"
          placeholder="Select tags..."
          options={tags}
          selected={tagIds}
          onChange={(selected) => save({ budgetIds, tagIds: selected })}
        />
      </CardContent>
    </Card>
  );
};
