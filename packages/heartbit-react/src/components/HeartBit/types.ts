import type { HeartBitCoreOptions } from "@fileverse/heartbit-core";
import type { HeartBitUIProps } from "..";

interface SignatureArgs {
  message: string;
  signature: string;
  onMintCallback?: () => void;
}

export interface HeartBitProps
  extends Omit<HeartBitUIProps, "isDisabled" | "startFillPos"> {
  coreOptions: HeartBitCoreOptions;
  getSignatureArgsHook: () => Promise<SignatureArgs>;
  hash: string;
  account?: string;
  showTotalMintsByHash?: boolean;
  showTotalMintsByUser?: boolean;
}
