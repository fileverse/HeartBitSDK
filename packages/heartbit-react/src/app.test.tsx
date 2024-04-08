/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from 'react';
import { render } from '@testing-library/react';
import { HeartBitContext, HeartBitProvider, IHeartBitContext } from './components';
import { describe, expect, jest, it } from '@jest/globals';
import HeartBitCore from '@fileverse/heartbit-core'; // Adjust the import path
import { HeartBitCoreOptions } from '.';

jest.mock('@fileverse/heartbit-core', () => ({
    HeartBitCore: jest.fn().mockImplementation(() => {
        return {
            getHeartBitByUser: jest.fn(),
            getTotalHeartBitCountByHash: jest.fn(),
            mintHeartBit: jest.fn(),
        }
    })
}));

describe('HeartBitProvider', () => {
    const coreOptions: HeartBitCoreOptions = { chain: "0xaa36a7" };
    const core: any = {
      getHeartBitByUser: jest.fn(),
      getTotalHeartBitCountByHash: jest.fn(),
      mintHeartBit: jest.fn(),
    };
    const testCases: [keyof IHeartBitContext, keyof any][] = [
      ['getTotalHeartMintsByUser', 'getHeartBitByUser'],
      ['getTotalHeartBitByHash', 'getTotalHeartBitCountByHash'],
      ['mintHeartBit', 'mintHeartBit']
  ];

  it('initializes HeartBitCore with coreOptions', () => {
    render(
      <HeartBitProvider coreOptions={coreOptions}>
        <div>Testing</div>
      </HeartBitProvider>
    );

    expect(HeartBitCore).toHaveBeenCalledWith(coreOptions);
  });

  it('provides context functions', () => {
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


  it.each(testCases)('calls %s through the provided context', async (contextFunction: keyof IHeartBitContext, coreFunction: any) => {
    const args = { id: 'test' };
    const TestComponent = () => {
      const context = React.useContext(HeartBitContext);

      useEffect(() => {
        context?.[contextFunction](args);
      }, [context]);

      return <div>Testing</div>;
    };

    render(
      <HeartBitProvider coreOptions={coreOptions}>
        <TestComponent />
      </HeartBitProvider>
    );

    expect(core[coreFunction]).toHaveBeenCalledWith(args);
  });

  it.each(testCases)('handles errors in %s', async (contextFunction, coreFunction) => {
    const error = new Error('Test Error');
    core[coreFunction].mockRejectedValue(error);

    const args = { id: 'test' };
    const TestComponent = () => {
      const context: any = React.useContext(HeartBitContext);

      useEffect(() => {
        const fetch = async () => {
          await expect(context?.[contextFunction](args)).rejects.toThrow(error);
        };
        fetch();
      }, [context]);

      return <div>Testing</div>;
    };

    render(
      <HeartBitProvider coreOptions={coreOptions}>
        <TestComponent />
      </HeartBitProvider>
    );

    expect(core[coreFunction]).toHaveBeenCalledWith(args);
  });
});
