import { createContext, useContext, ReactNode, useState } from "react";

interface ModalContextType {
  mintWithWalletSuccessFull: boolean;
  setMintWithWalletSuccessull: React.Dispatch<React.SetStateAction<boolean>>;
}
const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function useModalContext() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModalContext must be used within a ModalProvider");
  }
  return context;
}
interface ModalProviderProps {
  children: ReactNode;
}

export function ModalProvider({ children }: ModalProviderProps) {
  const [mintWithWalletSuccessFull, setMintWithWalletSuccessull] =
    useState<boolean>(false);
  return (
    <ModalContext.Provider
      value={{ mintWithWalletSuccessFull, setMintWithWalletSuccessull }}
    >
      {children}
    </ModalContext.Provider>
  );
}

export default ModalContext;
