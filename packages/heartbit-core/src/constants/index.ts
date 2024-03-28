import type { HeartBitConfig } from "../types/index.js";

export const PUBLIC_RPC_URL_MAP = {
  sepolia: "https://rpc.ankr.com/eth_sepolia",
  base: "https://rpc.ankr.com/base",
  gnosis: "https://rpc.ankr.com/gnosis"
};

export const HEART_BIT_CONFIG: HeartBitConfig = {
  "0xaa36a7": {
    chainId: 11155111,
    backendApi: "https://sepolia-heartbit.fileverse.io/signed-mint",
    contractAddress: "0x47E3fd3331a89822A980DA7Fe51592bD6f900FE6",
    publicRPCUrl: PUBLIC_RPC_URL_MAP.sepolia,
  },
  "0x2105": {
    chainId: 8453,
    backendApi: "https://base-heartbit.fileverse.io/signed-mint",
    contractAddress: "0x5290B2e25c98015cE80b43C5c5CfBd01aA372E04",
    publicRPCUrl: PUBLIC_RPC_URL_MAP.base,
  },
  "0x64": {
    chainId: 100,
    backendApi: "https://base-heartbit.fileverse.io/signed-mint",
    contractAddress: "0x5290B2e25c98015cE80b43C5c5CfBd01aA372E04",
    publicRPCUrl: PUBLIC_RPC_URL_MAP.gnosis,
  },
};

export const CONTRACT_ABI = [
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address[]",
        name: "accounts",
        type: "address[]",
      },
      {
        internalType: "uint256[]",
        name: "ids",
        type: "uint256[]",
      },
    ],
    name: "balanceOfBatch",
    outputs: [
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    name: "hashTokenMap",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "tokenHashMap",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];
