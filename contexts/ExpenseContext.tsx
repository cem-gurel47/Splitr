import React, { createContext, useState, useEffect } from "react";
import * as SQLite from "expo-sqlite";
import { Person } from "@models/person";

type ExpenseContextType = {
  loading: boolean;
  persons: Person[];
  setPersons: React.Dispatch<React.SetStateAction<Person[]>>;
  currency: string;
  getExpenses: () => void;
  addNewPerson: (name: string) => void;
  deleteEveryPerson: () => void;
  updatePerson: (id: number, name: string, expensesArray: any[]) => void;
};

export const ExpenseContext = createContext<ExpenseContextType>({
  loading: true,
  persons: [],
  setPersons: () => {},
  currency: "",
  getExpenses: () => {},
  addNewPerson: (name: string) => {},
  deleteEveryPerson: () => {},
  updatePerson: (id: number, name: string, expensesArray: any[]) => {},
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

  const addNewPerson = (name: string) => {
    db.transaction((tx) => {
      tx.executeSql("insert into persons (data) values (?)", [
        JSON.stringify({ name, expenses: [] }),
      ]);
    });
    getExpenses();
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

  const deleteEveryPerson = () => {
    db.transaction((tx) => {
      tx.executeSql("delete from persons", []);
    });
    getExpenses();
  };

  const updatePerson = (id: number, name: string, expensesArray: any[]) => {
    db.transaction((tx) => {
      tx.executeSql("update persons set data = ? where id = ?", [
        JSON.stringify({
          name,
          expenses: expensesArray,
        }),
        id,
      ]);
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
        setPersons,
        currency,
        getExpenses,
        addNewPerson,
        deleteEveryPerson,
        updatePerson,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};
