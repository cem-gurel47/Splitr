import { Person } from "./person";

export type StackParamList = {
  Home: undefined;
  "Final Report": undefined;
  "Person Expenses": Person;
  "Add New Person": undefined;
  "Add New Expense": {
    personId?: number;
  };
  "Select Currency": undefined;
  Settings: undefined;
};
