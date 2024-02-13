# Heartbit Core


# Introduction
This is the basis of the heartbit functionality. it exposes the APIs that are used to implement the heartbit functionality

# Getting Started

## Installation

You can install using `npm` or `yarn`

 ```javascript
npm install --save @fileverse/heartbit-core

//or

yarn add @fileverse/heartbit-core
```

## Import and use the package
 ```javascript
import { HeartBitCore } from "@fileverse/heartbit-core";
```
## Configure package
the sdk makes use of `coreOption` to configure the network at which the user will be interacting with.
 ```javascript
const coreSDK = new HeartBitCore({
  chain: "0xaa36a7",
});
```


Below is a minimal example of how you might want to use the sdk
```javascript
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
[Here](https://codesandbox.io/p/devbox/heartbit-core-sdk-example-37h7hw) is a link to a working example
