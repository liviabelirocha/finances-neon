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
import { addBulkTransactions } from "@/actions/add-bulk-transactions";
import { DeleteButton } from "../delete-button";
import { deleteTransaction } from "@/actions/delete-transaction";

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

    try {
      await upsertTransaction({
        ...transaction,
        date,
        tagId: transaction.tagId ?? undefined,
        recurring: false,
      });

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

    const date = set(new Date(), { month, year });

    try {
      await addBulkTransactions({
        boardId: urlParams.board as string,
        transactions: transactions.map((transaction) => ({
          ...transaction,
          date,
          tagId: transaction.tagId ?? undefined,
          id: undefined,
          recurring: false,
        })),
      });

      toast({
        title: `Transactions added successfully to ${format(date, "MMMM, yyyy")}`,
      });
    } catch {
      toast({ title: "Oops. Something went wrong", variant: "destructive" });
    }

    setIsSubmitting(false);
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
                  disabled={isSubmitting || !transactions.length}
                  variant="outline"
                >
                  Include all
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Add all listed transactions to this month</p>
              </TooltipContent>
            </Tooltip>
          </div>
          {transactions.map((transaction, idx) => (
            <div key={transaction.id} className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span>
                  {transaction.name} - {moneyFormat(transaction.amount / 100)}
                </span>
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
                      >
                        <Plus />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Add to this month&apos;s transactions</p>
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
