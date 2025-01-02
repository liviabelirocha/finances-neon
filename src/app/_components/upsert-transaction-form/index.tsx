"use client";

import { upsertTransaction } from "@/_actions/upsert-transaction";
import { TRANSACTION_TYPE_OPTIONS } from "@/_constants/transactions";
import { zodResolver } from "@hookform/resolvers/zod";
import { TransactionType } from "@prisma/client";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { MoneyInput } from "../money-input";
import { Button } from "../ui/button";
import { DatePicker } from "../ui/date-picker";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { upsertTransactionSchema } from "./schema";

type FormSchema = z.infer<typeof upsertTransactionSchema>;

export const UpsertTransactionForm = ({
  isOpen,
  setIsOpen,
  defaultValues,
}: {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  defaultValues?: FormSchema;
}) => {
  const params = useParams();

  const form = useForm<FormSchema>({
    resolver: zodResolver(upsertTransactionSchema),
    defaultValues: defaultValues ?? {
      amount: 0,
      date: new Date(),
      name: "",
      type: TransactionType.EXPENSE,
    },
  });

  const onSubmit = async (data: FormSchema) => {
    await upsertTransaction({
      ...data,
      amount: +data.amount * 100,
      boardId: params.board as string,
      id: data.id ?? "",
    });
    setIsOpen(false);
    form.reset();
  };

  const isUpdate = !!defaultValues?.id;

  return (
    <Sheet
      onOpenChange={(open) => {
        if (!open) form.reset();
        setIsOpen(open);
      }}
      open={isOpen}
    >
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{isUpdate ? "Update" : "Add"} Transaction</SheetTitle>
          <SheetDescription>Insert all the necessary info</SheetDescription>
        </SheetHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex h-full flex-col"
          >
            <div className="flex-grow space-y-3">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Type in the name..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Value</FormLabel>
                    <FormControl>
                      <MoneyInput
                        placeholder="Type in the value..."
                        value={field.value}
                        onValueChange={({ floatValue }) =>
                          field.onChange(floatValue)
                        }
                        onBlur={field.onBlur}
                        disabled={field.disabled}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a type..." />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {TRANSACTION_TYPE_OPTIONS.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date</FormLabel>
                    <DatePicker value={field.value} onChange={field.onChange} />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <SheetFooter>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  type="button"
                  className="w-full"
                  onClick={() => setIsOpen(false)}
                >
                  Cancel
                </Button>
              </SheetTrigger>
              <Button type="submit" className="w-full">
                {isUpdate ? "Update" : "Add"}
              </Button>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
};
