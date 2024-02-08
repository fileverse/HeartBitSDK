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
  apiKey: string;
};

export type HeartBitConfig = {
  [K in SupportedChain]: ChainConfig;
};

export interface MintHeartBitArgs {
  message: string;
  signature: string;
  startTime: number;
  endTime: number;
  hash: string;
}

export type TotalHeartBitCountArgs = {
  hash: string;
};

export type HeartBitCountByUserArgs = {
  hash: string;
  address: string;
};

export interface HeartBitCoreOptions {
  chain: SupportedChain;
  rpcUrl?: string;
}
