# @fileverse/heartbit-core

### Installation

```
npm install --save @fileverse/heartbit-core

//or

yarn add @fileverse/heartbit-core
```

## HeartBitCore

### Interface

```javascript
type SupportedChain = "0xaa36a7" | "0x2105";

interface HeartBitCoreOptions {
  chain: SupportedChain;
  rpcUrl?: string;
}

interface TotalHeartBitCountArgs {
  hash: string; // keccak256 hash of a string
}

interface HeartBitCountByUserArgs {
  hash: string; // keccak256 hash of a string
  address: string; // ethereum wallet address
}

interface MintHeartBitArgs {
  message: string;
  signature: string;
  startTime: number; // in seconds
  endTime: number; // in seconds
  hash: string; // keccak256 hash of a string
}
```

### Usage

```javascript
import { HeartBitCore } from "@fileverse/heartbit-core";

const coreSDK = new HeartBitCore({
  chain: "0xaa36a7",
});

async function main() {
  const message = "Hello World!";
  const signature = "0x...signed message";
  const startTime = 1706898250;
  const endTime = 1706898251;
  const hash = "Hello World"; // keccak256 hash of a string

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
  const address = "0x...ethaddress";
  const mintsByUser = await coreSDK.getHeartBitByUser({
    hash,
    address,
  });
}
```
