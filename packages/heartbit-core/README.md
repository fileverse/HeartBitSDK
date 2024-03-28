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

### Example Usage

This minimal example demonstrates how to use `HeartBitCore` for minting and querying data.

```javascript
async function main() {
	const message = "Hello World!";
	const signature = "0x...signed message";
	const startTime = 1706898250;
	const endTime = 1706898251;
	const hash = "Hello World"; // This is an identifier for the token, if this hash changes you mint a new token in that case

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

[Here](https://codesandbox.io/p/devbox/heartbit-core-sdk-example-37h7hw) is a link to a working example using `HeartBitCore`.

### Interfaces

```javascript
type SupportedChain = "0xaa36a7" | "0x2105" | "0x64";

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

Checkout [HeartBit React](https://github.com/fileverse/HeartBitSDK/edit/main/packages/heartbit-react) which uses the `HeartBitCore` to integrate HeartBit functionality in a react app.
