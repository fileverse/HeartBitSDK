import { HEART_BIT_CONFIG } from "./constants";
import type {
  TotalHeartBitCountArgs,
  HeartBitCoreOptions,
  MintHeartBitArgs,
  SupportedChain,
  HeartBitCountByUserArgs,
  UnSignedMintArgs,
} from "./types";

import {
  type Contract,
  type JsonRpcProvider,
  JsonRpcProvider as JRPCProvider,
} from "ethers";
import { getMinterContract, getHashedString } from "./utils";

export class HeartBitCore {
  chain: SupportedChain;
  #relayerUrl: string;
  #contract: Contract;
  #rpcProvider: JsonRpcProvider;

  constructor(opts: HeartBitCoreOptions) {
    const { chain, rpcUrl } = opts;

    if (!chain) throw new Error("Chain is required");

    this.chain = chain;
    this.#relayerUrl = HEART_BIT_CONFIG[chain].relayerUrl;
    this.#rpcProvider = new JRPCProvider(
      rpcUrl || HEART_BIT_CONFIG[chain].publicRPCUrl
    );
    this.#contract = getMinterContract(chain, this.#rpcProvider);
  }

  async mintHeartBit(opts: MintHeartBitArgs) {
    const response = await fetch(`${this.#relayerUrl}/signed-mint`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...opts,
      }),
    });

    const data = await response.json();
    return data;
  }

  async unSignedMintHeartBit(opts: UnSignedMintArgs) {
    const { apiKey, ...restArgs } = opts;
    const response = await fetch(this.#relayerUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey || "",
      },
      body: JSON.stringify({
        ...restArgs,
      }),
    });

    const data = await response.json();
    return data;
  }

  async getTotalHeartBitCountByHash(
    opts: TotalHeartBitCountArgs
  ): Promise<number> {
    const { hash } = opts;
    const tokenId = await this.getHeartbitHashTokenMap(hash);

    const balance = await this.#contract.totalSupply?.(tokenId);

    return parseInt(balance);
  }

  async getHeartbitHashTokenMap(url: string) {
    const hashTokenMap = await this.#contract.hashTokenMap?.(url);

    return hashTokenMap;
  }

  async getHeartBitByUser(opts: HeartBitCountByUserArgs): Promise<number> {
    const { address, hash } = opts;
    const tokenId = await this.getHeartbitHashTokenMap(hash);

    const balance = await this.#contract.balanceOf?.(address, tokenId);
    return parseInt(balance);
  }
}

export {
  getHashedString,
  type HeartBitCoreOptions,
  type SupportedChain,
  type HeartBitCountByUserArgs,
  type MintHeartBitArgs,
  type TotalHeartBitCountArgs,
  type UnSignedMintArgs,
};
