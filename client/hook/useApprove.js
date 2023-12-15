import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
  useAccount,
} from "wagmi";
import { parseUnits } from "viem";
import USDC_Polygon from "../contracts/USDC_Polygon.json";
import {
  USDC_POLYGON_ADDRESS,
  USDC_MUMBAI_ADDRESS,
  ClubCPG_POLYGON_ADDRESS,
  ClubCPG_MUMBAI_ADDRESS,
} from "@/utils/constant";
import { useState } from "react";

export const useApprove = (priceInUSDC) => {
  const { address, isConnected } = useAccount(); //TODO: Check user connection and network can be abstract and before function call

  // Tx construction
  const { config: USDC_APPROVAL } = usePrepareContractWrite({
    address: USDC_MUMBAI_ADDRESS, //TODO: Dynamic
    abi: USDC_Polygon.abi,
    functionName: "approve",
    args: [
      ClubCPG_MUMBAI_ADDRESS, //TODO: Dynamic
      parseUnits(`${priceInUSDC}`, 6),
    ],
  });

  // Launch Tx
  const {
    data: approveUSDCData,
    isLoading: isWaitingApproveUSDCSignatureFromUser,
    isSuccess: isApproveUSDCTxSent,
    write: approveUSDCMethod,
  } = useContractWrite(USDC_APPROVAL);

  // Tx validated by the network
  const {
    data: approveUSDCReceipt,
    isError: approveUSDCIsError,
    isLoading: approveUSDCIsLoading,
    error: approveUSDCError,
  } = useWaitForTransaction({
    hash: approveUSDCData?.hash,
  });

  return {
    isWaitingApproveUSDCSignatureFromUser,
    isApproveUSDCTxSent,
    approveUSDCMethod,
    approveUSDCReceipt,
    approveUSDCIsError,
    approveUSDCIsLoading,
    approveUSDCError,
  };
};
