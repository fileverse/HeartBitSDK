import { HEART_MINTER_CONFIG } from "./constants";
import type {
  TotalSupplyArgs,
  HeartbitCoreOptions,
  MintArgs,
  SupportedChain,
  UserBalanceArgs,
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

  async mintHeartbit(opts: MintArgs) {
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

  async getTotalSupply(opts: TotalSupplyArgs) {
    const { url } = opts;
    const tokenId = await this.getHeartbitUrlTokenMap(url as string);
    return await this.#contract.totalSupply?.(tokenId);
  }

  async getHeartbitUrlTokenMap(url: string) {
    return await this.#contract.urlTokenMap?.(url);
  }

  async getUserBalance(opts: UserBalanceArgs) {
    const { address, url } = opts;
    const tokenId = await this.getHeartbitUrlTokenMap(url);

    const balance = await this.#contract.balanceOf?.(address, tokenId);
    return parseInt(balance);
  }

  async getStartBlock() {
    return await this.#rpcProvider.getBlockNumber();
  }
}

export { getHashedString, type HeartbitCoreOptions, type SupportedChain };
