"use client";

import { NotFoundContextType } from "@/lib/types";
import { createContext, ReactNode, useContext, useState } from "react";

/**
 * Context for managing the state of a "not found" condition.
 *
 * This context can be used to share and update the "not found" status across different components in the application.
 * It is initialized with an `undefined` value, and consumers should check for this value to determine if the context has been properly initialized.
 */
const NotFoundContext = createContext<NotFoundContextType | undefined>(
  undefined
);

/**
 * NotFoundProvider component that provides a context for handling "not found" state.
 *
 * @param {Object} props - The props object.
 * @param {ReactNode} props.children - The child components that will have access to the context.
 *
 * @returns {JSX.Element} The NotFoundContext.Provider component with the provided context value.
 */
export const NotFoundProvider = ({ children }: { children: ReactNode }) => {
  const [isNotFound, setIsNotFound] = useState(false);

  return (
    <NotFoundContext.Provider
      value={{ isNotFound, setNotFound: setIsNotFound }}
    >
      {children}
    </NotFoundContext.Provider>
  );
};

/**
 * Custom hook to access the NotFoundContext.
 *
 * This hook provides the context value from NotFoundContext. It must be used within a NotFoundProvider,
 * otherwise it will throw an error.
 *
 * @throws {Error} If the hook is used outside of a NotFoundProvider.
 *
 * @returns {any} The context value from NotFoundContext.
 */
export const useNotFound = () => {
  const context = useContext(NotFoundContext);
  if (!context) {
    throw new Error("useNotFound must be used within a NotFoundProvider");
  }
  return context;
};
