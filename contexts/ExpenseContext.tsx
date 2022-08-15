import React, { createContext, useState, useEffect } from "react";
import { RefreshControl } from "react-native";
import * as SQLite from "expo-sqlite";
import { Person } from "@models/person";

type ExpenseContextType = {
  loading: boolean;
  persons: Person[];
  currency: string;
  getExpenses: () => void;
};

export const ExpenseContext = createContext<ExpenseContextType>({
  loading: true,
  persons: [],
  currency: "",
  getExpenses: () => {},
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
  const [persons, setPersons] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [currency, setCurrency] = useState("");

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
        setPersons(parsedExpensesArray);
      });
      setLoading(false);
    });
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

  const createCurrencyTable = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "create table if not exists currency (id integer primary key not null, currency string);"
      );
    });
  };

  const setDbCurrency = (currency: "USD" | "CAD" | "EUR" | "TL" | "") => {
    db.transaction((tx) => {
      tx.executeSql("insert into currency (currency) values (?)", [currency]);
    });
  };

  const getCurrency = () => {
    db.transaction((tx) => {
      tx.executeSql("SELECT * FROM currency", [], (_, { rows }) => {
        if (rows._array.length > 0) {
          setCurrency(rows._array[0].currency);
        }
      });
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
    createCurrencyTable();
    getCurrency();
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

  console.log(persons, currency);

  return (
    <ExpenseContext.Provider
      value={{
        loading,
        persons,
        currency,
        getExpenses,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};
