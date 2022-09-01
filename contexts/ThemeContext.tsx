import React, { createContext, useState, useEffect } from "react";
import { useColorMode } from "native-base";

import * as SQLite from "expo-sqlite";

type ThemeContextType = {
  theme: "light" | "dark";
  setTheme: React.Dispatch<React.SetStateAction<"light" | "dark">>;
  updateTheme: (theme: "light" | "dark") => void;
  themeLoading: boolean;
};

export const ThemeContext = createContext<ThemeContextType>({
  theme: "light",
  setTheme: () => {},
  updateTheme: () => {},
  themeLoading: true,
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

export const ThemeProvider = ({ children, db }: Props) => {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [themeLoading, setThemeLoading] = useState(true);
  const { toggleColorMode } = useColorMode();

  const createThemeTableIfNotExists = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS theme (id integer primary key not null,theme string)",
        []
      );
    });
  };

  const createDefaultTheme = () => {
    db.transaction((tx) => {
      tx.executeSql("INSERT INTO theme (theme) VALUES (?)", ["light"], () => {
        setThemeLoading(false);
      });
    });
  };

  const getTheme = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM theme",
        [],
        (_, { rows }) => {
          if (rows._array.length > 0) {
            setTheme(rows._array[0].theme);
            if (rows._array[0].theme === "dark") {
              toggleColorMode();
            }
            setThemeLoading(false);
          } else {
            console.log("no theme found, creating default theme");
            createDefaultTheme();
          }
        },
        //@ts-ignore
        (_, error) => {
          console.log("error", error);
        }
      );
    });
  };

  const dropThemeTable = () => {
    db.transaction((tx) => {
      tx.executeSql("DROP TABLE theme", [], () => {
        console.log("dropped");
      });
    });
  };

  const updateTheme = (theme: "light" | "dark") => {
    console.log("clicked");
    db.transaction((tx) => {
      tx.executeSql(
        "UPDATE theme SET theme = ? where id = ?",
        [theme, 1],
        () => {
          console.log("theme updated");
          setTheme(theme);
          toggleColorMode();
        }
      );
    });
  };

  useEffect(() => {
    createThemeTableIfNotExists();
    getTheme();
  }, []);

  return (
    <ThemeContext.Provider
      value={{ theme, setTheme, updateTheme, themeLoading }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
