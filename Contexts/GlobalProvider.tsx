import { getUser } from "@/lib/appWrite";
import React, { createContext, useContext, useEffect, useState } from "react";
import { Models } from "react-native-appwrite";

const globalContext = createContext<any>({});

export const useGlobalContext = () => useContext(globalContext);

export default function GlobalcontextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<Models.Document>();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getUser()
      .then((res) => {
        setUser(res);
        setIsLoggedIn(true);
      })
      .catch((error: any) => {
        console.log(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <globalContext.Provider
      value={{
        user,
        isLoading,
        isLoggedIn,
        setIsLoggedIn,
        setUser,
      }}
    >
      {children}
    </globalContext.Provider>
  );
}
