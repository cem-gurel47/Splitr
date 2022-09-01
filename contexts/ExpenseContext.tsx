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
  totalAmount: number;
  amountPerUser: number;
  deleteExpense: (expenseId: number, personId: number) => void;
  setDbCurrency: (currency: string) => void;
  updateCurrency: (currency: string) => void;
  deletePerson: (id: number) => void;
};

export const ExpenseContext = createContext<ExpenseContextType>({
  loading: true,
  persons: [],
  setPersons: () => {},
  currency: "",
  getExpenses: () => {},
  addNewPerson: () => {},
  deleteEveryPerson: () => {},
  updatePerson: () => {},
  totalAmount: 0,
  amountPerUser: 0,
  deleteExpense: () => {},
  setDbCurrency: () => {},
  deletePerson: () => {},
  updateCurrency: () => {},
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
  const [totalAmount, setTotalAmount] = useState(0);
  const [amountPerUser, setAmountPerUser] = useState(0);

  const getExpenses = () => {
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

        const totalAmount = parsedExpensesArray.reduce((acc, person) => {
          return acc + person.totalAmount;
        }, 0);

        const amountPerUser = totalAmount / parsedExpensesArray.length;

        setTotalAmount(totalAmount);
        setAmountPerUser(amountPerUser);
        setLoading(false);
      });
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

  const setDbCurrency = (currency: string) => {
    db.transaction((tx) => {
      tx.executeSql(
        "insert into currency (currency) values (?)",
        [currency],
        () => {
          setCurrency(currency);
        }
      );
    });
  };

  const updateCurrency = (currency: string) => {
    db.transaction((tx) => {
      tx.executeSql("update currency set currency = ?", [currency], () => {
        setCurrency(currency);
      });
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

  const addNewPerson = (name: string) => {
    db.transaction((tx) => {
      tx.executeSql("insert into persons (data) values (?)", [
        JSON.stringify({ name, expenses: [] }),
      ]);
    });
    getExpenses();
  };

  const deletePerson = (id: number) => {
    db.transaction((tx) => {
      tx.executeSql("delete from persons where id = ?", [id]);
    });
    getExpenses();
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

  const deleteExpense = (expenseId: number, personId: number) => {
    const person = persons.find((p) => p.id === personId);
    if (person) {
      const newPersonObject = { ...person };
      newPersonObject.expenses = newPersonObject.expenses.filter(
        (_, index) => index !== expenseId
      );

      db.transaction((tx) => {
        tx.executeSql(
          "update persons set data = ? where id = ?",
          [JSON.stringify(newPersonObject), personId],
          () => {
            getExpenses();
          }
        );
      });
    }
  };

  useEffect(() => {
    createTable();
    createCurrencyTable();
    getCurrency();
    getExpenses();
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
        totalAmount,
        amountPerUser,
        deleteExpense,
        setDbCurrency,
        deletePerson,
        updateCurrency,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};
