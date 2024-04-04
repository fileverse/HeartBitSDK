import { HeartBitCore } from './index';
import { getMinterContract } from './utils';
// import { Contract } from 'ethers';
import {describe, expect, jest, it} from '@jest/globals'
import { HEART_BIT_CONFIG } from './constants';

jest.mock('./utils', () => ({
    getMinterContract: jest.fn().mockImplementation(() => ({
      totalSupply: jest.fn().mockResolvedValue(10 as never),
      hashTokenMap: jest.fn().mockResolvedValue('token1' as never),  // Ensure this mock is in place
      balanceOf: jest.fn().mockResolvedValue(5 as never),
    })),
  }));

global.fetch = jest.fn(() =>
  Promise.resolve(new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  }))
);

describe('HeartBitCore', () => {
    const chain = '0xaa36a7'
    const rpcUrl = HEART_BIT_CONFIG[chain].publicRPCUrl
    const relayerUrl = HEART_BIT_CONFIG[chain].relayerUrl
    let core = new HeartBitCore({ chain, rpcUrl })
    const mintData = {
        message: "p6f7gr-5173.csb.app wants you to sign in with your Ethereum account:\n0x852bd84A4dcDc150648AE4e8D6D6e59b1797c86f\n\nHello World!\n\nURI: https://p6f7gr-5173.csb.app\nVersion: 1\nChain ID: undefined\nNonce: 6RnPMnIbRS1yQ02ZK\nIssued At: 2024-02-15T09:14:18.897Z",
        signature: "0xfff4ce944d488abf2f8b2fd80bf3f585cbd14bbafe37ffd8b88e69ad88bd0c86426898416eb2c9c4f913eaa01430f4cac405c5a5c53a6410652b56874b9bd45e1c",
        startTime: 1706898250,
        endTime: 1706898251,
        hash: "0xba0c379a9b364b41e69a6a00a8652e28cb7dda3ca684309b940807634919a940"
    }


  it('should initialize correctly with the provided options', () => {
    const chain = '0xaa36a7'
    const rpcUrl = HEART_BIT_CONFIG[chain].publicRPCUrl
    const core = new HeartBitCore({ chain, rpcUrl});
    expect(core).toBeDefined();
    expect(getMinterContract).toHaveBeenCalled();
  });

  it('should call fetch with the correct parameters on mintHeartBit', async () => {

    await core.mintHeartBit(mintData);

    expect(fetch).toHaveBeenCalledWith(expect.stringContaining('/signed-mint'), expect.objectContaining({
      method: 'POST',
      headers: expect.objectContaining({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify(mintData),
    }));
  });

  it('should call fetch with the correct parameters on unSignedMintHeartBit', async () => {
    const data = {
        message: "p6f7gr-5173.csb.app wants you to sign in with your Ethereum account:\n0x852bd84A4dcDc150648AE4e8D6D6e59b1797c86f\n\nHello World!\n\nURI: https://p6f7gr-5173.csb.app\nVersion: 1\nChain ID: undefined\nNonce: 6RnPMnIbRS1yQ02ZK\nIssued At: 2024-02-15T09:14:18.897Z",
        signature: "0xfff4ce944d488abf2f8b2fd80bf3f585cbd14bbafe37ffd8b88e69ad88bd0c86426898416eb2c9c4f913eaa01430f4cac405c5a5c53a6410652b56874b9bd45e1c",
        startTime: 1706898250,
        endTime: 1706898251,
        hash: "0xba0c379a9b364b41e69a6a00a8652e28cb7dda3ca684309b940807634919a940",
        account: "0x852bd84A4dcDc150648AE4e8D6D6e59b1797c86f",
        apiKey: 'hello'
    };
    const {apiKey, ...rest} = data
    await core.unSignedMintHeartBit(data);

    expect(fetch).toHaveBeenCalledWith(expect.stringContaining(relayerUrl), expect.objectContaining({
      method: 'POST',
      headers: expect.objectContaining({
        'Content-Type': 'application/json',
        'x-api-key': data.apiKey,
      }),
      body: JSON.stringify(rest),
    }));
  });

  it('should handle getTotalHeartBitCountByHash correctly', async () => {
    const mockTotalSupply = 10;
    const count = await core.getTotalHeartBitCountByHash({ hash: 'dummyHash' });

    expect(count).toEqual(mockTotalSupply);
  });

  it('should handle getHeartBitByUser correctly', async () => {
    const mockBalance = 5;
    const balance = await core.getHeartBitByUser({ account: '0x123', hash: 'dummyHash' });

    expect(balance).toEqual(mockBalance);
  });
});



