import { createContext, useContext, ReactNode, useState } from "react";

interface ModalContextType {
  mintWithWalletSuccessFull: boolean;
  setMintWithWalletSuccessull: React.Dispatch<React.SetStateAction<boolean>>;
  windowWidth: number | undefined;
  setWindowWidth: React.Dispatch<React.SetStateAction<number | undefined>>;
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
  const [windowWidth, setWindowWidth] = useState<number | undefined >();
  return (
    <ModalContext.Provider
      value={{ mintWithWalletSuccessFull, setMintWithWalletSuccessull, windowWidth, setWindowWidth }}
    >
      {children}
    </ModalContext.Provider>
  );
}

export default ModalContext;
