import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
  useAccount,
} from "wagmi";
import { parseUnits } from "viem";
import ClubCPG from "@/contracts/ClubCPG.json";
import {
  ClubCPG_POLYGON_ADDRESS,
  ClubCPG_MUMBAI_ADDRESS,
} from "@/utils/constant";
import { useEffect, useState } from "react";

export const useMint = (to, quantity) => {
  const { address, isConnected } = useAccount(); //TODO: Check user connection and network can be abstract and before function call

  // Tx construction
  const { config: ClubCPG_Mint } = usePrepareContractWrite({
    address: ClubCPG_MUMBAI_ADDRESS, //TODO: Dynamic
    abi: ClubCPG.abi,
    functionName: "mint",
    args: [
      to, //TODO: Dynamic
      parseUnits(`${quantity}`, 0),
    ],
  });

  // Launch Tx
  const {
    data: mintData,
    isLoading: isWaitingMintSignatureFromUser,
    isSuccess: isMintTxSent,
    write: mintMethod,
  } = useContractWrite(ClubCPG_Mint);

  // Tx validated by the network
  const {
    data: mintReceipt,
    isError: mintIsError,
    isLoading: mintIsLoading,
    error: mintError,
  } = useWaitForTransaction({
    hash: mintData?.hash,
  });

  return {
    isWaitingMintSignatureFromUser,
    isMintTxSent,
    mintMethod,
    mintReceipt,
    mintIsError,
    mintIsLoading,
    mintError,
  };
};
