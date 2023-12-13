import { createContext, useContext, ReactNode, useState } from "react";

interface ModalContextType {
  mintWithWalletSuccessFull: boolean;
  setMintWithWalletSuccessull: React.Dispatch<React.SetStateAction<boolean>>;
}
const ModalContext = createContext<ModalContextType | null>(null);
export function useModalContext() {
  const context = useContext(ModalContext);
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
