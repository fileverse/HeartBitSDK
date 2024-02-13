export type SupportedChain = "0xaa36a7" | "0x2105";

export type ChainConfig = {
  chainId: number;
  backendApi: string;
  publicRPCUrl: string;
  contractAddress: string;
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

export interface TotalHeartBitCountArgs {
  hash: string;
}

export interface HeartBitCountByUserArgs {
  hash: string;
  address: string;
}

export interface HeartBitCoreOptions {
  chain: SupportedChain;
  rpcUrl?: string;
}
