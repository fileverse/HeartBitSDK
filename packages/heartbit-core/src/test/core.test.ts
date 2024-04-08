import { HeartBitCore } from '../index';
import { getMinterContract } from '../utils';
import { describe, expect, jest, it } from '@jest/globals';
import { HEART_BIT_CONFIG } from '../constants';
import { mintData, unsignedMintData } from './mockData';

jest.mock('./utils', () => ({
    getMinterContract: jest.fn().mockImplementation(() => {
        return {
          totalSupply: jest.fn().mockResolvedValue('10' as never),
          hashTokenMap: jest.fn().mockResolvedValue('token1' as never),
          balanceOf: jest.fn().mockResolvedValue('5' as never),
        }
    }),
}));

global.fetch = jest.fn(() =>
Promise.resolve(new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
}))
);

describe('HeartBitCore', () => {
    const chain = '0xaa36a7';
    const rpcUrl = HEART_BIT_CONFIG[chain].publicRPCUrl;
    let core = new HeartBitCore({ chain, rpcUrl });

    it('should throw an error if chain is not provided', () => {
        expect(() => new HeartBitCore({} as any)).toThrow("Chain is required");
    });

    it('should initialize correctly with the provided options', () => {
        expect(core).toBeDefined();
        expect(getMinterContract).toHaveBeenCalledWith(chain, expect.anything());
    });

    it('should call fetch with the correct parameters on mintHeartBit', async () => {
        await core.mintHeartBit(mintData);

        expect(fetch).toHaveBeenCalledWith(`${HEART_BIT_CONFIG[chain].relayerUrl}/signed-mint`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(mintData),
        });
    });

    it('should call fetch with the correct parameters on unSignedMintHeartBit', async () => {

        const {apiKey, ...rest} = unsignedMintData
        await core.unSignedMintHeartBit(unsignedMintData);

        expect(fetch).toHaveBeenCalledWith(HEART_BIT_CONFIG[chain].relayerUrl, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'x-api-key': apiKey
            },
            body: JSON.stringify(rest),
        });
    });

    it('should handle getTotalHeartBitCountByHash correctly', async () => {
        const hash = 'dummyHash';
        const count = await core.getTotalHeartBitCountByHash({ hash });
        expect(count).toBe(10);
    });

    it('should handle getHeartbitHashTokenMap correctly', async () => {
        const hash = 'dummyHash';
        const tokenMap = await core.getHeartbitHashTokenMap(hash);

        expect(tokenMap).toBe('token1');
    });

    it('should handle getHeartBitByUser correctly', async () => {
        const account = '0x123';
        const hash = 'dummyHash';
        const balance = await core.getHeartBitByUser({ account, hash });

        expect(balance).toBe(5);
    });
});
