import { listDefaultTransactions } from "@/actions/default-transactions/list";
import { upsertTransaction } from "@/actions/upsert-transaction";
import { useToast } from "@/hooks/use-toast";
import { moneyFormat } from "@/lib/money-format";
import { Transaction as DbTransaction } from "@prisma/client";
import { format, set } from "date-fns";
import { Edit, Plus } from "lucide-react";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
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

export const AddRecurringExpensesForm = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}) => {
  const { toast } = useToast();
  const urlParams = useParams();
  const searchParams = useSearchParams();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [transactions, setTransactions] = useState<DbTransaction[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<
    DbTransaction | undefined
  >();

  const month = +(searchParams.get("month") ?? new Date().getMonth());
  const year = +(searchParams.get("year") ?? new Date().getFullYear());

  const fetchTransactions = async () => {
    const data = await listDefaultTransactions(urlParams.board as string);
    setTransactions(data);
  };

  const addTransaction = async (transaction: DbTransaction) => {
    setIsSubmitting(true);

    const date = set(new Date(), { month, year });

    await upsertTransaction({
      amount: transaction.amount,
      boardId: transaction.boardId,
      date,
      name: transaction.name,
      type: transaction.type,
      method: transaction.method,
      tagId: transaction.tagId || undefined,
      id: "",
    });

    setIsSubmitting(false);
    toast({
      title: `Transaction added successfully to ${format(date, "MMMM, yyyy")}`,
    });
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  useEffect(() => {
    if (editingTransaction) setIsFormOpen(true);
  }, [editingTransaction]);

  return (
    <>
      <Sheet
        onOpenChange={(open) => setIsOpen(open)}
        open={isOpen}
        modal={false}
      >
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Recurring Transaction</SheetTitle>
            <SheetDescription>
              In here you can manage transactions that are likely to happen
              every month
            </SheetDescription>
          </SheetHeader>
          <Button onClick={() => setIsFormOpen(true)} disabled={isSubmitting}>
            Add Recurring Transaction
          </Button>
          {transactions.map((transaction, idx) => (
            <div key={transaction.id} className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span>
                  {transaction.name} - {moneyFormat(transaction.amount / 100)}
                </span>
                <div className="flex gap-1">
                  <Button
                    variant="outline"
                    disabled={isSubmitting}
                    onClick={() => setEditingTransaction(transaction)}
                  >
                    <Edit />
                  </Button>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        onClick={() => addTransaction(transaction)}
                        disabled={isSubmitting}
                      >
                        <Plus />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Add to this month&apos;s transactions</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </div>
              {idx !== transactions.length - 1 && <Separator />}
            </div>
          ))}
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
            amount: editingTransaction.amount / 100,
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
