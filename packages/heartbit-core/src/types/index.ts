export type SupportedChain = "0xaa36a7" | "0x2105" | "0x64";

export type ChainConfig = {
  chainId: number;
  relayerUrl: string;
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

export interface UnSignedMintArgs {
  startTime: number;
  endTime: number;
  hash: string;
  account: string;
  apiKey: string;
}

export interface TotalHeartBitCountArgs {
  hash: string;
}

export interface HeartBitCountByUserArgs {
  hash: string;
  account: string;
}

export interface HeartBitCoreOptions {
  chain: SupportedChain;
  rpcUrl?: string;
}
