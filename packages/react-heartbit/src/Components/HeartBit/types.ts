import type { HeartbitCoreOptions } from "@fileverse/heartbit-core";

export interface OnMintArgs {
  url: string;
  message: string;
}

export interface MintResponse {
  transactionHash?: string;
}

export interface MinterParams {
  message: string;
  signature: string;
  url: string;
  onMintCallback?: () => MintResponse;
}

export interface HeartBitProps {
  coreOptions: HeartbitCoreOptions; // HeartbitCore SDK options
  address?: string; // User address
  getMinterParams: () => Promise<MinterParams>; // Callback function to be called when the user clicks on the HeartBit component
}
