import { HEART_MINTER_CONFIG } from "./constants";
import type {
  TotalHeartBitCountArgs,
  HeartbitCoreOptions,
  HeartBitArgs,
  SupportedChain,
  HeartBitCountByUserArgs,
} from "./types";

import {
  type Contract,
  type JsonRpcProvider,
  JsonRpcProvider as JRPCProvider,
} from "ethers";
import { getMinterContract, getHashedString } from "./utils";

export class HeartbitCore {
  chain: SupportedChain;
  #backendApi: string;
  #contract: Contract;
  #rpcProvider: JsonRpcProvider;

  constructor(opts: HeartbitCoreOptions) {
    const { chain, rpcUrl } = opts;

    if (!chain) throw new Error("Chain is required");

    this.chain = chain;
    this.#backendApi = HEART_MINTER_CONFIG[chain].backendApi;
    this.#rpcProvider = new JRPCProvider(
      rpcUrl || HEART_MINTER_CONFIG[chain].publicRPCUrl
    );
    this.#contract = getMinterContract(chain, this.#rpcProvider);
  }

  async mintHeartbit(opts: HeartBitArgs) {
    const { message, signature, startBlock, address, url } = opts;

    const response = await fetch(this.#backendApi, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message,
        signature,
        startBlock: startBlock,
        invokerAddress: address,
        rawUrl: url,
        urlString: getHashedString(url),
      }),
    });

    const data = await response.json();

    return data;
  }

  async getTotalSupply(opts: TotalHeartBitCountArgs) {
    const { hash } = opts;
    const tokenId = await this.getHeartbitUrlTokenMap(hash);
    return await this.#contract.totalSupply?.(tokenId);
  }

  async getHeartbitUrlTokenMap(url: string) {
    return await this.#contract.urlTokenMap?.(url);
  }

  async getUserBalance(opts: HeartBitCountByUserArgs) {
    const { address, hash } = opts;
    const tokenId = await this.getHeartbitUrlTokenMap(hash);

    const balance = await this.#contract.balanceOf?.(address, tokenId);
    return parseInt(balance);
  }

  async getStartBlock() {
    return await this.#rpcProvider.getBlockNumber();
  }
}

export { getHashedString, type HeartbitCoreOptions, type SupportedChain };
