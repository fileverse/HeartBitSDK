import { keccak256, toUtf8Bytes, Contract, type JsonRpcProvider } from "ethers";
import type { SupportedChain } from "../types";
import { CONTRACT_ABI, HEART_MINTER_CONFIG } from "../constants";

export const getHashedString = (str: string) => keccak256(toUtf8Bytes(str));

export const getMinterContract = (
  chain: SupportedChain,
  rpcProvider: JsonRpcProvider
): any => {
  const minterConfig = HEART_MINTER_CONFIG[chain];
  const { contractAddress } = minterConfig;

  return new Contract(contractAddress, CONTRACT_ABI, rpcProvider);
};

export const sleep = (ms = 1000): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
