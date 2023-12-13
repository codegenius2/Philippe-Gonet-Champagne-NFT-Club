import {
  usePrepareSendTransaction,
  useSendTransaction,
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
  useAccount,
  useWalletClient,
} from "wagmi";
import { getAddress, fromHex, parseUnits } from "viem";
import USDC_Polygon from "../contracts/USDC_Polygon.json";
import {
  USDC_POLYGON_ADDRESS,
  USDC_MUMBAI_ADDRESS,
  ClubCPG_POLYGON_ADDRESS,
  ClubCPG_MUMBAI_ADDRESS,
} from "@/utils/constant";
import { useEffect, useState } from "react";

export const useApprove = ({ priceInUSDC }) => {
  const { address, isConnected } = useAccount(); //TODO: Check user connection and network can be abstract and before function call
  const [approveState, setApproveState] = useState({});

  // Tx construction
  const { config: USDC_APPROVAL } = usePrepareContractWrite({
    address: USDC_MUMBAI_ADDRESS, //TODO: Dynamic
    abi: USDC_Polygon.abi,
    functionName: "approve",
    args: [
      ClubCPG_MUMBAI_ADDRESS, //TODO: Dynamic
      priceInUSDC
        ? parseUnits(Number(priceInUSDC).toString(), 6)
        : parseUnits("0", 6),
    ],
  });

  // Launch Tx
  const {
    data: approveUSDCData,
    isLoading: isWaitingApproveUSDCSignatureFromUser,
    isSuccess: isApproveUSDCTxSent,
    write: approveUSDCDataMethod,
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
    approveUSDCDataMethod,
    approveUSDCReceipt,
    approveUSDCIsError,
    approveUSDCIsLoading,
    approveUSDCError,
  };
};
