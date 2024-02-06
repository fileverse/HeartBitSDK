import type { HeartBitCoreOptions } from "@fileverse/heartbit-core";

export interface OnMintArgs {
  url: string;
  message: string;
}

export interface MintResponse {
  transactionHash?: string;
}

export interface SignatureArgs {
  message: string;
  signature: string;
  url: string;
  onMintCallback?: () => MintResponse;
}

export interface HeartBitUIProps {
  scale?: number;
  showFillPercentage?: boolean;
  onMouseUp?: (event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => void;
  onMouseDown?: (
    event: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => void;
  resetHeart?: () => void;
}

export interface HeartBitProps extends HeartBitUIProps {
  coreOptions: HeartBitCoreOptions; // HeartbitCore SDK options
  address: string; // User address
  getSignatureArgsHook?: () => Promise<SignatureArgs>; // Callback function to be called when the user clicks on the HeartBit component
}
