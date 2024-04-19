/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from "react";
import { render } from "@testing-library/react";
import { HeartBitContext, HeartBitProvider } from ".";
import { describe, expect, jest, it } from "@jest/globals";
import { HeartBitCoreOptions } from "@fileverse/heartbit-core";

const getHeartBitByUserMock = jest.fn();

jest.mock("@fileverse/heartbit-core", () => ({
  HeartBitCore: jest.fn().mockImplementation(() => {
    return {
      getHeartBitByUser: getHeartBitByUserMock,
      getTotalHeartBitCountByHash: jest.fn(),
      mintHeartBit: jest.fn(),
    };
  }),
}));

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
});
