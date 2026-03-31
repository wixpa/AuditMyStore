import { createContext, useContext, useState } from "react";

const HireModalContext = createContext(null);

export function HireModalProvider({ children }) {
   const [isOpen, setIsOpen] = useState(false);

   const openHireModal = () => setIsOpen(true);
   const closeHireModal = () => setIsOpen(false);

   return (
      <HireModalContext.Provider value={{ isOpen, openHireModal, closeHireModal }}>
         {children}
      </HireModalContext.Provider>
   );
}

export function useHireModal() {
   const ctx = useContext(HireModalContext);
   if (!ctx) throw new Error("useHireModal must be used within HireModalProvider");
   return ctx;
}

export default HireModalContext;
