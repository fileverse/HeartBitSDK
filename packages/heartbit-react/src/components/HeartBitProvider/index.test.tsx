/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from "react";
import { render, renderHook } from "@testing-library/react";
import { HeartBitContext, HeartBitProvider } from ".";
import { describe, expect, jest, it } from "@jest/globals";
import { HeartBitCoreOptions } from "@fileverse/heartbit-core";
import { useHeartBit } from "./useHeartBit";

const getHeartBitByUserMock = jest.fn();
const getTotalHeartBitByHashMock = jest.fn();
const mintHeartBitMock = jest.fn();
const mintData = {
  message: "p6f7gr-5173.csb.app wants you to sign in with your Ethereum account:\n0x852bd84A4dcDc150648AE4e8D6D6e59b1797c86f\n\nHello World!\n\nURI: https://p6f7gr-5173.csb.app\nVersion: 1\nChain ID: undefined\nNonce: 6RnPMnIbRS1yQ02ZK\nIssued At: 2024-02-15T09:14:18.897Z",
  signature: "0xfff4ce944d488abf2f8b2fd80bf3f585cbd14bbafe37ffd8b88e69ad88bd0c86426898416eb2c9c4f913eaa01430f4cac405c5a5c53a6410652b56874b9bd45e1c",
  startTime: 1706898250,
  endTime: 1706898251,
  hash: "0xba0c379a9b364b41e69a6a00a8652e28cb7dda3ca684309b940807634919a940"
}
jest.mock("@fileverse/heartbit-core", () => ({
  HeartBitCore: jest.fn().mockImplementation(() => {
    return {
      getHeartBitByUser: getHeartBitByUserMock,
      getTotalHeartBitCountByHash: getTotalHeartBitByHashMock,
      mintHeartBit: mintHeartBitMock,
    };
  }),
}));
const providerContextValue = {
  getTotalHeartMintsByUser: jest.fn() as any,
  getTotalHeartBitByHash: jest.fn() as any,
  mintHeartBit: jest.fn() as any,
}
const wrapper = ({ children } : any) => (
  <HeartBitContext.Provider value={providerContextValue}>
    {children}
  </HeartBitContext.Provider>
);


describe("HeartBitProvider", () => {
  const coreOptions: HeartBitCoreOptions = { chain: "0xaa36a7" };

  it("provides context functions", () => {
    const TestComponent = () => {
      const context = React.useContext(HeartBitContext);

      expect(context).not.toBeNull();
      expect(context?.getTotalHeartMintsByUser).toBeDefined();
      expect(context?.getTotalHeartBitByHash).toBeDefined();
      expect(context?.mintHeartBit).toBeDefined();

      return <div>Testing</div>;
    };

    render(
      <HeartBitProvider coreOptions={coreOptions}>
        <TestComponent />
      </HeartBitProvider>
    );
  });

  it("calls getTotalHeartMintsByUser", async () => {
    const TestComponent = () => {
      const context = React.useContext(HeartBitContext);
      useEffect(() => {
        context?.getTotalHeartMintsByUser({
          hash: "ipfs://test",
          account: "0xtest",
        });
      }, [context]);

      return <div>Testing</div>;
    };

    render(
      <HeartBitProvider coreOptions={coreOptions}>
        <TestComponent />
      </HeartBitProvider>
    );

    expect(getHeartBitByUserMock).toHaveBeenCalledWith({
      hash: "ipfs://test",
      account: "0xtest",
    });
  });

  it("calls getTotalHeartBitByHash", async () => {
    const TestComponent = () => {
      const context = React.useContext(HeartBitContext);
      useEffect(() => {
        context?.getTotalHeartBitByHash({ hash: "ipfs://test" });
      }, [context]);

      return <div>Testing</div>;
    };

    render(
      <HeartBitProvider coreOptions={coreOptions}>
        <TestComponent />
      </HeartBitProvider>
    );

    expect(getTotalHeartBitByHashMock).toHaveBeenCalledWith({
      hash: "ipfs://test",
    });
  });

  it("calls mintHeartBit", async () => {
    const TestComponent = () => {
      const context = React.useContext(HeartBitContext);
      useEffect(() => {
        context?.mintHeartBit(mintData);
      }, [context]);

      return <div>Testing</div>;
    };

    render(
      <HeartBitProvider coreOptions={coreOptions}>
        <TestComponent />
      </HeartBitProvider>
    );

    expect(mintHeartBitMock).toHaveBeenCalledWith(mintData);
  });
});

describe('useHeartBit hook', () => {
  it('should throw an error when used outside of a HeartBitProvider', () => {
    let error: any
    try {
      renderHook(() => useHeartBit());
    } catch (e) {
      error = e;
    }
    expect(error?.message).toBe('useHeartBit must be used within a HeartBitProvider');
  });

  it('should successfully provide context when used within a HeartBitProvider', () => {
    const { result } = renderHook(() => useHeartBit(), { wrapper });
    expect(result.current).toEqual(providerContextValue);
  });
});

