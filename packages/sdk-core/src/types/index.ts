// User will pass signed message
// Two modes:
// Signed: User pass message and signature
// Signless: We initialize signer and take care of signing - Next
export type SupportedChain = "sepolia" | "gnosis";

export type ChainConfig = {
  chainId: number;
  backendApi: string;
  contractAddress: string;
  publicRPCUrl: string;
};

export type HeartMinterConfig = {
  [K in SupportedChain]: ChainConfig;
};

export type MintArgs = {
  message?: string;
  signature?: string;
  startBlock?: number;
  address?: string;
  url: string;
};

export type TotalSupplyArgs = {
  url?: string;
};

export type UserBalanceArgs = {
  url: string;
  address: string;
};

export type HeartbitCoreOptions = {
  chain: SupportedChain;
  rpcUrl?: string;
};
