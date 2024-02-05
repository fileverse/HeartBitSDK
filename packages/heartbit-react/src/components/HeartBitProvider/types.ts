import { HeartbitCoreOptions } from "../../../../heartbit-core/dist/types";

export interface IHeartBitContext {
  onMouseDown: () => void;
  onMouseUp: () => void;
  startTime: number;
  endTime: number;
}

export interface HeartBitProviderProps {
  children: React.ReactNode;
  coreOptions: HeartbitCoreOptions;
}

export interface TimeStampState {
  startTime: number;
  endTime: number;
}
