# HeartBit Core

## Introduction

This is the core of the [HeartBit](https://github.com/fileverse/HeartBitSDK) functionality. It exposes the APIs that are crucial for implementing HeartBit functionalities.

## Getting Started

### Installation

You can install the package using either `npm` or `yarn`:

```javascript
npm install --save @fileverse/heartbit-core

// or

yarn add @fileverse/heartbit-core
```

### Import and Use the Package

```javascript
import { HeartBitCore } from "@fileverse/heartbit-core";
```

### Configure the Package

The SDK utilizes `coreOption` to configure the network for user interactions.

```javascript
const coreSDK = new HeartBitCore({
  chain: "0xaa36a7",
});
```

### Example Usage - mintHeartBit (Signed Mint)

This minimal example demonstrates how to use `HeartBitCore` for minting and querying data.

```javascript
async function main() {
  const message = "Hello World!";
  const signature = "0x...signed message";
  const startTime = 1706898250;
  const endTime = 1706898251;
  const hash = "ipfs://somecid"; // unique identifier for token. eg ipfs://somecid

  // Mint HeartBit

  await coreSDK.mintHeartBit({
    message,
    signature,
    startTime,
    endTime,
    hash,
  });

  // Get TotalSupply for a hash

  const totalSupply = await coreSDK.getTotalHeartBitCountByHash({ hash });

  // Get Total Mints By User
  const account = "0x...ethaddress";
  const mintsByUser = await coreSDK.getHeartBitByUser({
    hash,
    account,
  });
}
```

[Here](https://codesandbox.io/p/devbox/heartbit-core-sdk-example-37h7hw) is a link to a working example using `HeartBitCore`.

### Example Usage - unSignedMintHeartBit (Unsigned Mint)

This minimal example demonstrates how to use `HeartBitCore` for minting heartbit without signature.

```javascript
async function main() {
  const startTime = 1706898250;
  const endTime = 1706898251;
  const hash = "ipfs://cid"; // unique identifier for token. eg ipfs://somecid
  const apiKey = "hello";
  const account = "0x...ethaddress";

  // Mint HeartBit

  await coreSDK.unSignedMintHeartBit({
    startTime,
    endTime,
    hash,
    account,
    apiKey,
  });

  // Get TotalSupply for a hash

  const totalSupply = await coreSDK.getTotalHeartBitCountByHash({ hash });

  // Get Total Mints By User
  const mintsByUser = await coreSDK.getHeartBitByUser({
    hash,
    account,
  });
}
```

### Interfaces

```javascript
type SupportedChain = "0xaa36a7" | "0x2105" | "0x64";

interface HeartBitCoreOptions {
  chain: SupportedChain;
  rpcUrl?: string;
}

interface TotalHeartBitCountArgs {
  hash: string; // unique identifier for token. eg ipfs://somecid
}

interface HeartBitCountByUserArgs {
  hash: string; // unique identifier for token. eg ipfs://somecid
  account: string; // ethereum wallet address
}

interface MintHeartBitArgs {
  message: string;
  signature: string;
  startTime: number; // in seconds
  endTime: number; // in seconds
  hash: string; // unique identifier for token. eg ipfs://somecid
}

interface UnSignedMintArgs {
  startTime: number;
  endTime: number;
  hash: string; // unique identifier for token. eg ipfs://somecid
  account: string; // target wallet address to which heartbits should be minted
  apiKey: string; // Api Key
}
```

Checkout [HeartBit React](https://github.com/fileverse/HeartBitSDK/edit/main/packages/heartbit-react) which uses the `HeartBitCore` to integrate HeartBit functionality in a react app.
