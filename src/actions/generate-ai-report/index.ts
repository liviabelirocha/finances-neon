"use server";

import { moneyFormat } from "@/lib/money-format";
import { auth } from "@clerk/nextjs/server";
import { set } from "date-fns";
import { monthTransactions } from "../transactions/month-transactions";

export const generateAiReport = async ({
  boardId,
  month,
  year,
}: {
  boardId: string;
  month: number;
  year: number;
}) => {
  const { userId } = await auth();

  if (!userId) throw new Error("Unauthorized");

  const initialDate = set(new Date(), {
    month,
    year,
    date: 1,
    hours: 0,
    minutes: 0,
    seconds: 0,
    milliseconds: 0,
  });

  const transactions = await monthTransactions({ boardId, initialDate });

  const content = `Generate a report with insights about my monthly finances, including tips and guidance on how to improve my financial life. Do not use the table format to answer. The transactions are separated by semicolons. The structure of each transaction is {NAME}-{TYPE}-{VALUE}-{CATEGORY}. They are: ${transactions
    .map(
      (transaction) =>
        `${transaction.name}-${moneyFormat(transaction.amount / 100)}-${transaction.type}-${transaction.tag?.name ?? "UNKNOWN"}`,
    )
    .join(";")}`;

  const response = await fetch("https://api.mistral.ai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.MISTRAL_API_KEY}`,
    },
    body: JSON.stringify({
      model: "mistral-small-latest",
      messages: [
        {
          role: "system",
          content:
            "You are a specialist in personal finance management and organization. You help people better organize their finances.",
        },
        {
          role: "user",
          content,
        },
      ],
    }),
  });

  const data = await response.json();

  return data.choices[0].message.content;
};
