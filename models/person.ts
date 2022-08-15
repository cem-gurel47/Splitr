import { Expense } from "./expense";

export type Person = {
  id: number;
  name: string;
  expenses: Expense[];
  totalAmount: number;
};
