import { parse } from "date-fns";
import {
  UpsertTransactionFormType,
  upsertTransactionSchema,
} from "../upsert-transaction-form/schema";

export type RawFileRow = [
  name: string,
  type: string,
  amount: number | string,
  date: string,
  paymentMethod: string,
];

const normalizedAmount = (amount: string | number) =>
  typeof amount === "string" ? parseFloat(amount.replace(",", ".")) : amount;

export const parseFile = (file: RawFileRow[]): ParsedFile => {
  const parsed: ParsedFile["data"] = [];
  const errors: ParsedFile["errors"] = [];

  for (const row of file) {
    const [name, type, amount, date, paymentMethod] = row;

    try {
      const parsedData = upsertTransactionSchema.parse({
        name,
        type: type.toUpperCase(),
        amount: normalizedAmount(amount) * 100,
        date: parse(date, "d/M/yyyy", new Date()),
        method: paymentMethod.toUpperCase(),
      });

      parsed.push(parsedData);
    } catch (err) {
      console.log(err);
      errors.push(`${name}, ${type}, ${amount}, ${date}, ${paymentMethod}`);
    }
  }

  return {
    data: parsed,
    errors,
  };
};

export type ParsedFile = {
  data: UpsertTransactionFormType[];
  errors: string[];
};
