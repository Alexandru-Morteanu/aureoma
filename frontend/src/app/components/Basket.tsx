"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the context value type
type BasketContextType = {
  basketItemCount: number;
  updateBasketItemCount: (countUpdater: (prevCount: number) => number) => void;
  language: string;
  setLanguage: Function;
};

// Create a context
const BasketContext = createContext<BasketContextType | undefined>(undefined);

// Create a provider component
type BasketProviderProps = {
  children: ReactNode;
};

export const BasketProvider: React.FC<BasketProviderProps> = ({ children }) => {
  const [basketItemCount, setBasketItemCount] = useState(0);
  const [language, setLanguage] = useState("ro");

  const updateBasketItemCount = (
    countUpdater: (prevCount: number) => number
  ) => {
    setBasketItemCount((prevCount) => countUpdater(prevCount));
  };

  const contextValue: BasketContextType = {
    basketItemCount,
    updateBasketItemCount,
    language,
    setLanguage,
  };

  return (
    <BasketContext.Provider value={contextValue}>
      {children}
    </BasketContext.Provider>
  );
};

export const useBasket = (): BasketContextType => {
  const context = useContext(BasketContext);
  if (context === undefined) {
    throw new Error("useBasket must be used within a BasketProvider");
  }
  return context;
};
