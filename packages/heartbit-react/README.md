# HeartBit React

## Introduction

A plug-and-play integration of the [HeartBit SDK](https://github.com/fileverse/HeartBitSDK), which is a wrapper around [HeartBitCore](https://github.com/fileverse/HeartBitSDK/tree/main/packages/heartbit-core).

## Getting Started

### Installation

You can install using `npm` or `yarn`:

```javascript
npm install --save @fileverse/heartbit-react

// or

yarn add @fileverse/heartbit-react
```

### Import Packages

Import the core component of the package `HeartBit`:

```javascript
import { HeartBit } from "@fileverse/heartbit-react";
```

### Integrate HeartBit Functionality

First of all, you want to set up your wallet providers. For this example, we will be using the `BrowserProvider` from `ethers` as our provider. We will create a React component that will render `HeartBit`, and we are going to configure the network by passing the `coreOption` as props to it. It requires the `getSignatureArgsHook` as props as well, which it calls internally to get the `message`, `signature`, and optionally an `onMintCallback`, a function that will be called after mint is completed. We would also define `hash` that will be used for generating the tokenId on the smart contract generally use `ipfs hash` here for `eg: ipfs://cid`, and we will use `SIWE` for generating the `message` and `signature`. The code below should do the trick:

```javascript
const MyApp = () => {
  const provider = new BrowserProvider((window as any).ethereum);
  const coreOptions = {
    chain: "0xaa36a7" as SupportedChain
  }

  const getSignatureArgsHook = async () => {
    const signer = await provider.getSigner()
    const address = await signer.getAddress();

    const siweMessage = new SiweMessage({
      domain: window.location.host,
      address,
      statement: "Hello World!",
      uri: window.location.origin,
      version: "1",
    });

    const message = siweMessage.prepareMessage();
    const signature = await signer.signMessage(message);

    return {
      message,
      signature,
      onMintCallback: () => {
        console.log("Minted!")
      }
    };
  };

 const hash = "ipfs//cid"; // This is an identifier for the token, if this hash changes you mint a new token in that case

  return <HeartBit
          coreOptions={coreOptions}
          getSignatureArgsHook={getSignatureArgsHook}
          hash={hash}
        />;
}
```

If all the process was successful, you should see a heart on your screen, and when you click and hold it for long, it should fill up. Once released, some NFTs related to the amount of time spent on clicking the button will be minted to the user.

[Here](https://codesandbox.io/p/devbox/hearbit-example-cxr375) is a working example using HeartBit.

## Customisation

You can attach the HeartBit functionality to any UI component and instead of being restricted by our default heart icon. To achieve this, the `heartbit-react` package exports `HeartBitProvider` and `useHeartBit`. The `HeartBitProvider` is used to configure the core package with the `coreOptions`, and `useHeartBit` exposes the core functions of the HeartBit SDK, which we can call in a React component. Note that it can only be used in the context of `HeartBitProvider`.

### Example Usage

```javascript
import { useState, useEffect } from 'react'
import { HeartBitProvider } from "@fileverse/heartbit-react"

const MyApp = () => {
    const coreOptions = {
        chain: "0xaa36a7" as SupportedChain
    }
    return (
         <HeartBitProvider coreOptions={coreOptions}>
            <CustomHeartBit />
         </HeartBitProvider>
         )
const CustomHearBit = () => {
     const { mintHeartBit, getTotalHeartMintsByUser, getTotalHeartBitByHash } = useHeartBit()
     const [startTime, setStartTime] = useState<number | null>(null) // should be in seconds

     const address = '0x...someaddress'
     const hash = 'ipfs://cid' // This is an identifier for the token, if this hash changes you mint a new token eg: ipfs://cid
     useEffect(() => {
        const fetchBalances = async () => {
            const totalMintsByHash = await getTotalHeartBitByHash({ hash }); // Total Supply for a hash
            const totalMintsByUser = await getTotalHeartMintsByUser({ address, hash }); // Total mints for a user by hash

            console.log({ totalMintsByHash, totalMintsByUser})
        }
        fetchBalances()
     }, []);

     const onMouseDown = () => {
        setStartTime(Math.floor(Date.now() / 1000))
     }

     const onMouseUp = async () => {
         const endTime = Math.floor(Date.now() / 1000);
         await mintHeartBit({
            startTime,
            endTime,
            hash, // This is an identifier for the token, if this hash changes you mint a new token. eg: ipfs://cid
            message, // raw message that was signed
            signature, // signed message
         })
     }

     return <button onMouseUp={onMouseUp} onMouseDown={onMouseDown}>Hello World</button>
}
```

[Here](https://codesandbox.io/p/devbox/custom-heartbit-example-p6f7gr) is a working example using the `HeartBitProvider` and `useHeartBit`.

### Interface

```javascript
interface SignatureArgs {
  message: string;
  signature: string;
  onMintCallback?: () => void; // will be called after NFT minting is done
}
interface HeartBitProps
  extends Omit<HeartBitUIProps, "isDisabled" | "startFillPos"> {
  coreOptions: HeartBitCoreOptions;
  getSignatureArgsHook: () => Promise<SignatureArgs>; // this is a required hook, this allows to call sign message operation on the user wallet, must return SignatureArgs
  hash: string; // This is an identifier for the token, if this hash changes you mint a new token. eg: ipfs://cid
  address?: string; // user wallet address
  showTotalMintsByHash?: boolean; // Default to false, if true will show total mints for a hash to the right of component
  showTotalMintsByUser?: boolean; // Defaults to false, if true will show total mints by a user on a hash to right of the component
}

type SupportedChain = "0xaa36a7" | "0x2105" | "0x64";
interface HeartBitCoreOptions {
  chain: SupportedChain;
  rpcUrl?: string;
}
interface HeartBitProviderProps {
  children: React.ReactNode;
  coreOptions: HeartBitCoreOptions;
}
interface TotalHeartBitCountArgs {
  hash: string; // This is an identifier for the token, if this hash changes you mint a new token. eg: ipfs://cid
}
interface HeartBitCountByUserArgs {
  hash: string; // This is an identifier for the token, if this hash changes you mint a new token. eg: ipfs://cid
  address: string; // ethereum wallet address
}
interface MintHeartBitArgs {
  message: string;
  signature: string;
  startTime: number; // in seconds
  endTime: number; // in seconds
  hash: string; // This is an identifier for the token, if this hash changes you mint a new token. eg: ipfs://cid
}
interface IHeartBitContext {
  getTotalHeartMintsByUser: (opts: HeartBitCountByUserArgs) => Promise<number>;
  getTotalHeartBitByHash: (opts: TotalHeartBitCountArgs) => Promise<number>;
  mintHeartBit: (opts: MintHeartBitArgs) => Promise<void>;
}
```
