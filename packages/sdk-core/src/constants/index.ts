import type { HeartMinterConfig } from "../types/index.js";

export const PUBLIC_RPC_URL_MAP = {
  sepolia: "https://rpc.ankr.com/eth_sepolia",
  gnosis: "https://rpc.ankr.com/gnosis",
};

export const HEART_MINTER_CONFIG: HeartMinterConfig = {
  sepolia: {
    chainId: 11155111,
    backendApi: "https://dev-fileverse-gate.herokuapp.com/account/mint-heart",
    contractAddress: "0x22DC4599B5e772aEB0BDAFE12e45FfB9B22653b9",
    publicRPCUrl: PUBLIC_RPC_URL_MAP.sepolia,
  },
  gnosis: {
    chainId: 100,
    backendApi:
      "https://fileverse-portal-gate.herokuapp.com/account/mint-heart",
    contractAddress: "0x5FeEf4DEDD03bd5368b72CfC2857168B10d930aa",
    publicRPCUrl: PUBLIC_RPC_URL_MAP.gnosis,
  },
};

export const CONTRACT_ABI = [
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    name: "urlTokenMap",
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
];
