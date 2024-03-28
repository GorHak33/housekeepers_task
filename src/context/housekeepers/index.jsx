import React, { createContext, useReducer } from "react";
import reducer from "./reducer";

const HousekeepersContext = createContext({
  keepers: [],
  dialogs: {
    isOpen: false,
  },
  dispatch: () => {},
});

const fromLocal = localStorage.getItem("housekeepersState");

const parsed = JSON.parse(fromLocal) || [
  {
    id: 1,
    fullName: "Cleaner 1",
    tasks: [],
  },
  {
    id: 2,
    fullName: "Cleaner 2",
    tasks: [],
  },
  {
    id: 3,
    fullName: "Cleaner 3",
    tasks: [],
  },
  {
    id: 4,
    fullName: "Cleaner 4",
    tasks: [],
  },
  {
    id: 5,
    fullName: "Cleaner 5",
    tasks: [],
  },
];

const HousekeepersProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {
    keepers: parsed,
    dialogs: {
      isOpen: false,
    },
  });

  return (
    <HousekeepersContext.Provider value={{ state, dispatch }}>
      {children}
    </HousekeepersContext.Provider>
  );
};

export { HousekeepersContext, HousekeepersProvider };
