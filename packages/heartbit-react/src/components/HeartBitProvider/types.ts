/* eslint-disable @typescript-eslint/no-explicit-any */
import type {
  HeartBitCoreOptions,
  HeartBitCountByUserArgs,
  TotalHeartBitCountArgs,
  MintHeartBitArgs,
} from "@fileverse/heartbit-core";

export interface IHeartBitContext {
  getTotalHeartMintsByUser: (opts: HeartBitCountByUserArgs) => Promise<number>;
  getTotalHeartBitByHash: (opts: TotalHeartBitCountArgs) => Promise<number>;
  mintHeartBit: (opts: MintHeartBitArgs) => Promise<void>;
}

export interface HeartBitProviderProps {
  children: React.ReactNode;
  coreOptions: HeartBitCoreOptions;
}
