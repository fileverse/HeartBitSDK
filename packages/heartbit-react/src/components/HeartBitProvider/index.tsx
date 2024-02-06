import { createContext, useMemo, useState } from "react";
import { getNowTimeInSeconds } from "../../utils";
import type {
  IHeartBitContext,
  HeartBitProviderProps,
  TimeStampState,
} from "./types";
import {
  HeartBitCore,
  type HeartBitCountByUserArgs,
  type TotalHeartBitCountArgs,
  type MintHeartBitArgs,
} from "@fileverse/heartbit-core";

export const HeartBitContext = createContext<IHeartBitContext | null>(null);

export const HeartBitProvider = (props: HeartBitProviderProps) => {
  const { children } = props;

  const [timeStamps, setTimeStamps] = useState<TimeStampState>({
    startTime: 0,
    endTime: 0,
  });

  const coreSDK = useMemo(
    () => new HeartBitCore(props.coreOptions),
    [props.coreOptions]
  );

  const getTotalHeartMintsByUser = async (opts: HeartBitCountByUserArgs) => {
    const totalMints = await coreSDK.getHeartBitByUser(opts);
    return totalMints;
  };

  const getTotalHeartBitByHash = async (opts: TotalHeartBitCountArgs) => {
    const totalMints = await coreSDK.getTotalHeartBitCountByHash(opts);
    return totalMints;
  };

  const captureStartTime = () => {
    setTimeStamps((prevState) => ({
      ...prevState,
      startTime: getNowTimeInSeconds(),
    }));
  };

  const mintHeartBit = async (opts: MintHeartBitArgs) => {
    const minted = await coreSDK.mintHeartBit(opts);
    return minted;
  };

  const captureEndTime = () => {
    setTimeStamps((prevState) => ({
      ...prevState,
      endTime: getNowTimeInSeconds(),
    }));
  };

  const contextValue = {
    captureStartTime,
    captureEndTime,
    getTotalHeartMintsByUser,
    getTotalHeartBitByHash,
    mintHeartBit,
    ...timeStamps,
  };

  return (
    <HeartBitContext.Provider value={contextValue}>
      {children}
    </HeartBitContext.Provider>
  );
};
