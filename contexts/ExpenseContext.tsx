import React, { createContext, useState, useEffect } from "react";
import * as SQLite from "expo-sqlite";

type ExpenseContextType = {
  loading: boolean;
  expenses: {
    id: number;
    name: string;
    totalAmount: number;
    expenses: {
      description: string;
      amount: number;
    }[];
  }[];
};

export const ExpenseContext = createContext<ExpenseContextType>({
  loading: true,
  expenses: [],
});

type Props = {
  children: React.ReactNode;
  db:
    | SQLite.WebSQLDatabase
    | {
        transaction: () => {
          executeSql: () => void;
        };
      };
};

export const ExpenseProvider = ({ children, db }: Props) => {
  const [expenses, setExpenses] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const getExpenses = () => {
    setLoading(true);
    db.transaction((tx) => {
      tx.executeSql("SELECT * FROM persons", [], (_, { rows }) => {
        const parsedExpensesArray = rows._array.map((row) => {
          const parsed = JSON.parse(row.data);
          return {
            id: row.id,
            name: parsed.name,
            expenses: parsed.expenses,
            totalAmount: parsed.expenses.reduce(
              (acc: number, curr: { amount: number }) => {
                return acc + curr.amount;
              },
              0
            ),
          };
        });
        setExpenses(parsedExpensesArray);
        setLoading(false);
      });
    });
    setLoading(false);
  };

  const dropTable = () => {
    db.transaction((tx) => {
      tx.executeSql("drop table persons", []);
    });
  };

  const createTable = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "create table if not exists persons (id integer primary key not null, data string);"
      );
    });
  };

  const addData = (name: string, expensesArray: any[]) => {
    db.transaction((tx) => {
      tx.executeSql(
        "insert into persons (data) values (?)",
        [
          JSON.stringify({
            name,
            expenses: expensesArray,
          }),
        ],
        (_, { rows }) => {
          // setExpenses(rows._array);
        }
      );
    });
  };

  useEffect(() => {
    setLoading(true);
    createTable();
    // addData("Cem", [
    //   {
    //     description: "Food",
    //     amount: 100,
    //   },
    //   {
    //     description: "Rent",
    //     amount: 1500,
    //   },
    //   {
    //     description: "Car",
    //     amount: 1000,
    //   },
    // ]);

    // addData("John", [
    //   {
    //     description: "Food",
    //     amount: 50,
    //   },
    //   {
    //     description: "Electricity",
    //     amount: 100,
    //   },
    //   {
    //     description: "Gas",
    //     amount: 50,
    //   },
    // ]);

    getExpenses();
    setLoading(false);
  }, []);

  console.log(expenses);

  return (
    <ExpenseContext.Provider
      value={{
        loading,
        expenses,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};
