import type {
  HeartBitCoreOptions,
  HeartBitCountByUserArgs,
  TotalHeartBitCountArgs,
} from "@fileverse/heartbit-core";

export interface IHeartBitContext {
  captureStartTime: () => void;
  captureEndTime: () => void;
  getTotalHeartMintsByUser: (opts: HeartBitCountByUserArgs) => Promise<number>;
  getTotalHeartBitByHash: (opts: TotalHeartBitCountArgs) => Promise<number>;
  startTime: number;
  endTime: number;
}

export interface HeartBitProviderProps {
  children: React.ReactNode;
  coreOptions: HeartBitCoreOptions;
}

export interface TimeStampState {
  startTime: number;
  endTime: number;
}
