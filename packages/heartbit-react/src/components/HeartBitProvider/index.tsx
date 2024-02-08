import { createContext, useCallback, useMemo } from "react";

import type { IHeartBitContext, HeartBitProviderProps } from "./types";

import {
  HeartBitCore,
  type HeartBitCountByUserArgs,
  type TotalHeartBitCountArgs,
  type MintHeartBitArgs,
} from "@fileverse/heartbit-core";

const HeartBitContext = createContext<IHeartBitContext | null>(null);

const HeartBitProvider = (props: HeartBitProviderProps) => {
  const { children, coreOptions } = props;

  const coreSDK = useMemo(() => new HeartBitCore(coreOptions), [coreOptions]);

  const getTotalHeartMintsByUser = useCallback(
    async (opts: HeartBitCountByUserArgs) => {
      const totalMints = await coreSDK.getHeartBitByUser(opts);
      return totalMints;
    },
    [coreSDK]
  );

  const getTotalHeartBitByHash = useCallback(
    async (opts: TotalHeartBitCountArgs) => {
      const totalMints = await coreSDK.getTotalHeartBitCountByHash(opts);
      return totalMints;
    },
    [coreSDK]
  );

  const mintHeartBit = useCallback(
    async (opts: MintHeartBitArgs) => {
      const minted = await coreSDK.mintHeartBit(opts);
      return minted;
    },
    [coreSDK]
  );

  const contextValue = useMemo(
    () => ({
      getTotalHeartMintsByUser,
      getTotalHeartBitByHash,
      mintHeartBit,
    }),
    [getTotalHeartBitByHash, getTotalHeartMintsByUser, mintHeartBit]
  );

  return (
    <HeartBitContext.Provider value={contextValue}>
      {children}
    </HeartBitContext.Provider>
  );
};

export {
  HeartBitProvider,
  HeartBitContext,
  type IHeartBitContext,
  type HeartBitProviderProps,
};
