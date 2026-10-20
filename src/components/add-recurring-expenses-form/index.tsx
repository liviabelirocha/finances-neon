import { listDefaultTransactions } from "@/actions/default-transactions/list";
import { upsertTransaction } from "@/actions/upsert-transaction";
import { useToast } from "@/hooks/use-toast";
import { formatCents, fromCents } from "@/lib/money-format";
import { Tag, Transaction as DbTransaction } from "@prisma/client";
import { useSelectedMonth } from "@/hooks/use-selected-month";
import { monthStart } from "@/lib/date";
import { format } from "date-fns";
import { Check, Edit, LoaderCircle, Plus } from "lucide-react";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "../ui/sheet";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { UpsertTransactionForm } from "../upsert-transaction-form";
import { addBulkTransactions } from "@/actions/add-bulk-transactions";
import { DeleteButton } from "../delete-button";
import { deleteTransaction } from "@/actions/delete-transaction";
import { monthTransactions } from "@/actions/transactions/month-transactions";

type TransactionWithTag = DbTransaction & { tag: Tag | null };

export const AddRecurringExpensesForm = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}) => {
  const { toast } = useToast();
  const urlParams = useParams();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [transactions, setTransactions] = useState<TransactionWithTag[]>([]);
  const [monthlyTransactions, setMonthlyTransactions] = useState<
    DbTransaction[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<
    TransactionWithTag | undefined
  >();

  const { month, year } = useSelectedMonth();
  const boardId = urlParams.board as string;

  const fetchTransactions = useCallback(async () => {
    setIsLoading(true);
    try {
      const [recurring, monthly] = await Promise.all([
        listDefaultTransactions(boardId),
        monthTransactions({
          boardId,
          initialDate: monthStart({ month, year }),
        }),
      ]);
      setTransactions(recurring);
      setMonthlyTransactions(monthly);
    } finally {
      setIsLoading(false);
    }
  }, [boardId, month, year]);

  const addedTransactionNames = useMemo(() => {
    return new Set(monthlyTransactions.map((t) => t.name));
  }, [monthlyTransactions]);

  const total = useMemo(() => {
    return transactions.reduce((sum, t) => sum + t.amount, 0);
  }, [transactions]);

  const addTransaction = async (transaction: TransactionWithTag) => {
    setIsSubmitting(true);

    const date = monthStart({ month, year });

    try {
      await upsertTransaction({
        ...transaction,
        date,
        tagId: transaction.tagId ?? undefined,
        recurring: false,
      });

      await fetchTransactions();

      toast({
        title: `Transaction added successfully to ${format(date, "MMMM, yyyy")}`,
      });
    } catch {
      toast({ title: "Oops. Something went wrong", variant: "destructive" });
    }

    setIsSubmitting(false);
  };

  const addAll = async () => {
    setIsSubmitting(true);

    const date = monthStart({ month, year });

    const transactionsToAdd = transactions.filter(
      (t) => !addedTransactionNames.has(t.name),
    );

    if (transactionsToAdd.length === 0) {
      toast({
        title: "All recurring transactions are already added this month",
      });
      setIsSubmitting(false);
      return;
    }

    try {
      await addBulkTransactions({
        boardId,
        transactions: transactionsToAdd.map((transaction) => ({
          ...transaction,
          date,
          tagId: transaction.tagId ?? undefined,
          id: undefined,
          recurring: false,
        })),
      });

      await fetchTransactions();

      toast({
        title: `${transactionsToAdd.length} transaction(s) added to ${format(date, "MMMM, yyyy")}`,
      });
    } catch {
      toast({ title: "Oops. Something went wrong", variant: "destructive" });
    }

    setIsSubmitting(false);
  };

  useEffect(() => {
    if (isOpen) fetchTransactions();
  }, [isOpen, fetchTransactions]);

  useEffect(() => {
    if (editingTransaction) setIsFormOpen(true);
  }, [editingTransaction]);

  const pendingCount = transactions.filter(
    (t) => !addedTransactionNames.has(t.name),
  ).length;

  return (
    <>
      <Sheet
        onOpenChange={(open) => setIsOpen(open)}
        open={isOpen}
        modal={false}
      >
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Recurring Transactions</SheetTitle>
            <SheetDescription>
              In here you can manage transactions that are likely to happen
              every month
            </SheetDescription>
          </SheetHeader>
          <div className="grid grid-cols-2 gap-2">
            <Button onClick={() => setIsFormOpen(true)} disabled={isSubmitting}>
              Add Recurring
            </Button>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={addAll}
                  disabled={isSubmitting || pendingCount === 0}
                  variant="outline"
                >
                  {pendingCount > 0
                    ? `Include all (${pendingCount})`
                    : "Include all"}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Add all pending transactions to this month</p>
              </TooltipContent>
            </Tooltip>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <LoaderCircle className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          ) : transactions.length === 0 ? (
            <div className="py-8 text-center text-muted-foreground">
              No recurring transactions yet. Add one to get started.
            </div>
          ) : (
            <>
              {transactions.map((transaction, idx) => {
                const isAdded = addedTransactionNames.has(transaction.name);
                return (
                  <div key={transaction.id} className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="flex items-center gap-2">
                          {transaction.name} - {formatCents(transaction.amount)}
                          {isAdded && (
                            <Check className="h-4 w-4 text-green-500" />
                          )}
                        </span>
                        {transaction.tag && (
                          <span className="text-xs text-muted-foreground">
                            {transaction.tag.name}
                          </span>
                        )}
                      </div>
                      <div className="flex gap-1">
                        <Button
                          size="sm"
                          variant="outline"
                          disabled={isSubmitting}
                          onClick={() => setEditingTransaction(transaction)}
                        >
                          <Edit />
                        </Button>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              size="sm"
                              onClick={() => addTransaction(transaction)}
                              disabled={isSubmitting}
                              variant={isAdded ? "outline" : "default"}
                            >
                              {isAdded ? <Check /> : <Plus />}
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>
                              {isAdded
                                ? "Add another to this month"
                                : "Add to this month's transactions"}
                            </p>
                          </TooltipContent>
                        </Tooltip>
                        <DeleteButton
                          action={async (id) => {
                            await deleteTransaction(id);
                            await fetchTransactions();
                          }}
                          id={transaction.id}
                          name={transaction.name}
                          variant="destructive"
                        />
                      </div>
                    </div>
                    {idx !== transactions.length - 1 && <Separator />}
                  </div>
                );
              })}
              <Separator />
              <div className="flex justify-between font-medium">
                <span>Total</span>
                <span>{formatCents(total)}</span>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>

      <UpsertTransactionForm
        isOpen={isFormOpen}
        setIsOpen={(open) => {
          setIsFormOpen(open);
          if (!open) setEditingTransaction(undefined);
        }}
        recurring
        onSubmit={async () => {
          await fetchTransactions();
          setEditingTransaction(undefined);
          setIsOpen(true);
        }}
        defaultValues={
          editingTransaction && {
            id: editingTransaction.id,
            amount: fromCents(editingTransaction.amount),
            date: editingTransaction.date,
            name: editingTransaction.name,
            type: editingTransaction.type,
            tagId: editingTransaction.tagId ?? undefined,
            method: editingTransaction.method,
          }
        }
      />
    </>
  );
};
