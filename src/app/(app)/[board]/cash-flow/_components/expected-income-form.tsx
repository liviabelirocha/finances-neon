"use client";

import { upsertExpectedIncome } from "@/actions/expected-income/upsert";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { MoneyInput } from "@/components/upsert-transaction-form/_components/money-input";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const expectedIncomeFormSchema = z.object({
  amount: z
    .number({ required_error: "Amount is required" })
    .positive({ message: "Amount must be positive" }),
});

type ExpectedIncomeFormType = z.infer<typeof expectedIncomeFormSchema>;

export const ExpectedIncomeForm = ({
  boardId,
  month,
  year,
  defaultAmount,
  submitLabel = "Save",
  onSaved,
  onCancel,
}: {
  boardId: string;
  month: number;
  year: number;
  /** In cents. */
  defaultAmount: number | null;
  submitLabel?: string;
  onSaved?: () => void;
  onCancel?: () => void;
}) => {
  const { toast } = useToast();

  const form = useForm<ExpectedIncomeFormType>({
    resolver: zodResolver(expectedIncomeFormSchema),
    defaultValues: { amount: defaultAmount ? defaultAmount / 100 : undefined },
  });

  const onSubmit = async ({ amount }: ExpectedIncomeFormType) => {
    try {
      await upsertExpectedIncome({
        boardId,
        month,
        year,
        amount: Math.round(amount * 100),
      });
      onSaved?.();
    } catch {
      toast({
        title: "Failed to save expected income",
        variant: "destructive",
      });
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-2 sm:flex-row sm:items-start"
      >
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormControl>
                <MoneyInput
                  placeholder="Expected income for the month..."
                  value={field.value}
                  onValueChange={({ floatValue }) => field.onChange(floatValue)}
                  onBlur={field.onBlur}
                  disabled={form.formState.isSubmitting}
                  autoFocus
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-2">
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {submitLabel}
            {form.formState.isSubmitting && (
              <LoaderCircle className="animate-spin" />
            )}
          </Button>
          {onCancel && (
            <Button
              type="button"
              variant="ghost"
              onClick={onCancel}
              disabled={form.formState.isSubmitting}
            >
              Cancel
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
};
