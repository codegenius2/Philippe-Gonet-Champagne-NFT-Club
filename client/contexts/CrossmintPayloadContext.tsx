import React, { ReactNode, createContext, useState } from "react";
import { useContext } from "react";

interface ModalContextType {
  crossmintPayloadLocationdata: any;
  setCrossmintPayloadLocationdata: any;
}

const CrossmintPayloadContext = createContext<ModalContextType | null>(null);

export const useCrossmintPayloadContext = () => {
  const crossmintContext = useContext(CrossmintPayloadContext);
  if (!crossmintContext) {
    throw new Error("useModalContext must be used within a ModalProvider");
  }
  return crossmintContext;
};

interface CrossmintProviderProps {
  children: ReactNode;
}
export const CrossmintProvider = ({ children }: CrossmintProviderProps) => {
  const [crossmintPayloadLocationdata, setCrossmintPayloadLocationdata] =
    useState(null);

  return (
    <CrossmintPayloadContext.Provider
      value={{
        crossmintPayloadLocationdata,
        setCrossmintPayloadLocationdata,
      }}
    >
      {children}
    </CrossmintPayloadContext.Provider>
  );
};
