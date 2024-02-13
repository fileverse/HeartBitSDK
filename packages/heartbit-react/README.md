# Heartbit React

## Introduction
A plug and play integration of the heartbit sdk. it is a wrapper around [HeartBitCore]((https://github.com/fileverse/HeartBitSDK/tree/main/packages/heartbit-core))

## Getting Started

### Installation

 You can install using `npm` or `yarn`

 ```javascript
npm install --save @fileverse/heartbit-react

//or

yarn add @fileverse/heartbit-react
```

### Import packages
import the core component of the package `HeartBit` 
```javascript
import { HeartBit } from "@fileverse/heartbit-react";
```

### Integrate Heartbit functionality to your component

First of all, you want to set up your wallet providers, for this example we will be using the `BrowserProvider` from `ethers` as our provider and we will create a react component that will render `HeartBit` and we are going to configure the network by passing the `coreOption` as props to it. it requires the `getSignatureArgsHook` as props as well, it calls it internally to get the `message, signature` and optionally an `onMintCallback` which is a function that will be called after mint is completed. we would also define `hash`  which is a keccak256 hash that will be used for generating the tokenId on the smart contract and we will use `SIWE` for generating the `message` and `signature`.  The code blow should do the trick

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

 const hash = keccak256(toUtf8Bytes("MY_APP_TOKEN"));

  return <HeartBit
          coreOptions={coreOptions}
          getSignatureArgsHook={getSignatureArgsHook }
          hash={hash}
        />;
}

```
if all the process was successful you shoulde see a heart on your screen and when you click and hold it for long it should fill up and once released some nfts related to the amount of time spent on clicking the button will be minted to the user



## Customization

You can basically attach the heartsbit functionality to any UI and not get limited to use the love icon. To achieve this the `heartbit-react` package exports  `HeartBitProvider` and `useHeartBit`.  The `HeartBitProvider` is used to configure the core package with the `coreOptions` and `useHeartBit` is expose the core functions of the heartbit sdk which we can call in a react component - note that it can only be used in the context of `HeartBitProvider`.

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
     const hash = '0x....somehash'
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
            hash, // keccak256 hash of a string
            message, // raw message that was signed
            signature, // signed message
         })
     }

     return <button onMouseUp={onMouseUp} onMouseDown={onMouseDown}>Hello World</button>
}

```
Here is a working example on [HeartBit](https://codesandbox.io/p/devbox/hearbit-example-cxr375)
[Here](https://codesandbox.io/p/devbox/custom-heartbit-example-p6f7gr)  is a working example on using the `HeartBitProvider` and `useHeartBit` 



























# @fileverse/heartbit-react

### About the project

This library contains react components to capture on chain timespent by a user. At the end of the flow an ERC1155 NFT is minted to the user address.

Main Exports of this library are

- HeartBitUI - A heart component made with canvas
- HeartBitProvider and useHeartbit - Provider and hook that exposes heartbit mint functionality to its children
- HeartBit - A Plug and Play integration of the HeartBitUI and HeartBitProvider

### Supported Chain

- Sepolia - 0xaa36a7
- base - 0x2105

### Installation

```
npm install --save @fileverse/heartbit-react

//or

yarn add @fileverse/heartbit-react
```

### Dependencies

**Required Peer Dependencies**
These libraries are not bundled with in this package and required at runtime:

- react
- react-dom

**Other Dependencies**

- @fileverse/heartbit-core
- classnames

## HeartBitUI

### Interface

```javascript
type TotalFillRange = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

type DefaultFillRange = 1 | 2 | 3 | 4 | 5;

interface HeartBitUIProps {
  onMouseUp?: (event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => void;
  onMouseDown?: (
    event: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => void;
  scale?: number; // Default Value = 3. size of the canvas, min dimensions width = 13, height = 12. eg: scale = 3 => width: 39px height: 36px
  defaultFillPos?: DefaultFillRange; //Default Value = 2. default position of fill in heart on load, onMouseDown the fill will always start from 0 not from defaultFillPos.
  startFillPos?: TotalFillRange; // Default Value = 0. start fill position in heart on load, onMouseDown the fill will resume from this position.
  isDisabled?: boolean; // Default Value = false. disables all actions.
  disableBeatingAnimation?: boolean; // Default Value = false. disables heat beating animation
  fillInterval?: number; // Default Value = 750. Interval at which the heart fills in milliseconds
}
```

### Usage

```javascript
import { HeartBitUI } from "@fileverse/heartbit-react";

export const MyApp = () => {
  return <HeartBitUI />;
};

/* 
    Additionally you can pass a ref to HeartBitUI. 
    This will expose a onReset function from the component, 
    on use will reset the heart fill to the defaultFillPos or the startFillPos 
*/
```

## HeartBitProvider and useHeartBit

### Interface

```javascript
type SupportedChain = "0xaa36a7" | "0x2105";

interface HeartBitCoreOptions {
  chain: SupportedChain;
  rpcUrl?: string;
}

interface HeartBitProviderProps {
  children: React.ReactNode;
  coreOptions: HeartBitCoreOptions;
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

interface IHeartBitContext {
  getTotalHeartMintsByUser: (opts: HeartBitCountByUserArgs) => Promise<number>;
  getTotalHeartBitByHash: (opts: TotalHeartBitCountArgs) => Promise<number>;
  mintHeartBit: (opts: MintHeartBitArgs) => Promise<void>;
}
```

### Usage

```javascript
import { useState, useEffect } from 'react'
import { HeartBitProvider, useHeartBit } from "@fileverse/heartbit-react"

const MyApp = () => {
    const coreOptions = {
        chain: "0xaa36a7" as SupportedChain
    }
    return (
         <HeartBitProvider coreOptions={coreOptions}>
            <ComponentWithProvider />
         </HeartBitProvider>
         )

const ComponentWithProvider = () => {
     const { mintHeartBit, getTotalHeartMintsByUser, getTotalHeartBitByHash } = useHeartBit()
     const [startTime, setStartTime] = useState<number | null>(null) // should be in seconds

     const address = '0x...someaddress'
     const hash = '0x....somehash'
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
            hash, // keccak256 hash of a string
            message, // raw message that was signed
            signature, // signed message
         })
     }

     return <button onMouseUp={onMouseUp} onMouseDown={onMouseDown}>Hello World</button>
}
```

## HeartBit

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
  hash: string; // keccak256 hash of a string
  address?: string; // user wallet address
  showTotalMintsByHash?: boolean; // Default to false, if true will show total mints for a hash to the right of component
  showTotalMintsByUser?: boolean; // Defaults to false, if true will show total mints by a user on a hash to right of the component
}
```

### Usage

```javascript
import { HeartBit, type SupportedChain } from "@fileverse/heartbit-react";
import { SiweMessage } from "siwe";
import { BrowserProvider, keccak256, toUtf8Bytes } from "ethers";

const MyApp = () => {
  const provider = new BrowserProvider((window as any).ethereum);

  const hash = keccak256(toUtf8Bytes(window.location.href));

  const signMessageHook = async () => {
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

  const coreOptions = {
    chain: "0xaa36a7" as SupportedChain
  }

  return <HeartBit
          coreOptions={coreOptions}
          getSignatureArgsHook={signMessageHook}
          hash={hash}
          scale={10}
        />;
}
```
