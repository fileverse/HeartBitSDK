import { memo } from "react";
import { HeartBitCoreOptions } from "@fileverse/heartbit-core";
import { HeartBitUI, HeartBitProvider, useHeartBit } from "../";
import type { HeartBitUIProps } from "../HeartBitUI/types";

export interface MintResponse {
  transactionHash?: string;
}

export interface SignatureArgs {
  message: string;
  signature: string;
  url: string;
  onMintCallback?: () => MintResponse;
}

export interface HeartBitProps extends HeartBitUIProps {
  coreOptions: HeartBitCoreOptions; // HeartbitCore SDK options
  address: string; // User address
  getSignatureArgsHook?: () => Promise<SignatureArgs>; // Callback function to be called when the user clicks on the HeartBit component
}

export const HeartBit = memo(function HeartBit(props: HeartBitProps) {
  const { coreOptions } = props;
  return (
    <HeartBitProvider coreOptions={coreOptions}>
      <HeartBitWithProvider />
    </HeartBitProvider>
  );
});

const HeartBitWithProvider = () => {
  const { captureStartTime, captureEndTime } = useHeartBit();

  return (
    <HeartBitUI onMouseDown={captureStartTime} onMouseUp={captureEndTime} />
  );
};
