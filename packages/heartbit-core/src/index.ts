import { HEART_MINTER_CONFIG } from "./constants";
import type {
  TotalHeartBitCountArgs,
  HeartBitCoreOptions,
  MintHeartBitArgs,
  SupportedChain,
  HeartBitCountByUserArgs,
} from "./types";

import {
  type Contract,
  type JsonRpcProvider,
  JsonRpcProvider as JRPCProvider,
} from "ethers";
import { getMinterContract, getHashedString } from "./utils";

export class HeartBitCore {
  chain: SupportedChain;
  #backendApi: string;
  #contract: Contract;
  #rpcProvider: JsonRpcProvider;
  #apiKey: string;

  constructor(opts: HeartBitCoreOptions) {
    const { chain, rpcUrl } = opts;

    if (!chain) throw new Error("Chain is required");

    this.chain = chain;
    this.#backendApi = HEART_MINTER_CONFIG[chain].backendApi;
    this.#rpcProvider = new JRPCProvider(
      rpcUrl || HEART_MINTER_CONFIG[chain].publicRPCUrl
    );
    this.#contract = getMinterContract(chain, this.#rpcProvider);
    this.#apiKey = HEART_MINTER_CONFIG[chain].apiKey;
  }

  async mintHeartBit(opts: MintHeartBitArgs) {
    await fetch(this.#backendApi, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": this.#apiKey,
      },
      body: JSON.stringify({
        ...opts,
      }),
    });
  }

  async getTotalHeartBitCountByHash(opts: TotalHeartBitCountArgs) {
    const { hash } = opts;
    const tokenId = await this.getHeartbitHashTokenMap(hash);
    return await this.#contract.totalSupply?.(tokenId);
  }

  async getHeartbitHashTokenMap(url: string) {
    const hashTokenMap = await this.#contract.hashTokenMap?.(url);

    return hashTokenMap;
  }

  async getHeartBitByUser(opts: HeartBitCountByUserArgs) {
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
};
