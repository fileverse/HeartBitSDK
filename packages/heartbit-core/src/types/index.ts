// User will pass signed message
// Two modes:
// Signed: User pass message and signature
// Signless: We initialize signer and take care of signing - Next
export type SupportedChain = "0xaa36a7" | "0x2105";

export type ChainConfig = {
  chainId: number;
  backendApi: string;
  contractAddress: string;
  publicRPCUrl: string;
};

export type HeartBitConfig = {
  [K in SupportedChain]: ChainConfig;
};

export type HeartBitArgs = {
  message?: string;
  signature?: string;
  startBlock?: number;
  address?: string;
  url: string;
};

export type TotalHeartBitCountArgs = {
  hash: string;
};

export type HeartBitCountByUserArgs = {
  hash: string;
  address: string;
};

export type HeartbitCoreOptions = {
  chain: SupportedChain;
  rpcUrl?: string;
};
