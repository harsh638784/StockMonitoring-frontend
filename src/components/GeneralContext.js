// GeneralContext.js
import React, { useState, useMemo } from "react";
import BuyActionWindow from "./BuyActionWindow";

const GeneralContext = React.createContext({
  openBuyWindow: () => {},
  closeBuyWindow: () => {},
  selectedStockUID: "",
  isBuyWindowOpen: false,
});

export const GeneralContextProvider = ({ children }) => {
  const [isBuyWindowOpen, setIsBuyWindowOpen] = useState(false);
  const [selectedStockUID, setSelectedStockUID] = useState("");

  const openBuyWindow = (uid) => {
    setSelectedStockUID(uid);
    setIsBuyWindowOpen(true);
  };

  const closeBuyWindow = () => {
    setIsBuyWindowOpen(false);
    setSelectedStockUID("");
  };

  const value = useMemo(
    () => ({ openBuyWindow, closeBuyWindow, selectedStockUID, isBuyWindowOpen }),
    [selectedStockUID, isBuyWindowOpen]
  );

  return (
    <GeneralContext.Provider value={value}>
      {children}
      {isBuyWindowOpen && (
        <BuyActionWindow uid={selectedStockUID} onClose={closeBuyWindow} />
      )}
    </GeneralContext.Provider>
  );
};

export default GeneralContext;
