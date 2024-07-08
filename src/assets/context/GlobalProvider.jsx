import React, { createContext, useEffect, useState } from "react";

export const GlobalContext = createContext(null);

const GlobalProvider = ({ children }) => {
  const [filter, setFilter] = useState({
    status: "",
    starred: null,
  });

  const [currentPage, setCurrentPage] = useState(1);

  const [search, setSearch] = useState({
    query: "",
    date: "",
    employee: "",
    custoemr: ""
  })

  return (
    <GlobalContext.Provider
      value={{
        filter,
        setFilter,
        currentPage,
        setCurrentPage,

        //new
        search, // Provide search state
        setSearch, // Provide setSearch function
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;

export const useGlobal = () => {
  const context = React.useContext(GlobalContext);
  if (context === undefined) {
    throw new Error("useGlobal must be used within a GlobalProvider");
  }
  return context;
};
