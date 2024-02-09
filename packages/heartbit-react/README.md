# @fileverse/heartbit-react

### Installation

```
npm install --save @fileverse/heartbit-react

//or

yarn add @fileverse/heartbit-react
```

### Dependencies

**Required Peer Dependencies**
These libraries are not bundled with Reactstrap and required at runtime:

- react
- react-dom

### About the project

This library contains react components to capture on chain timespent by a user. At the end of the flow an ERC1155 NFT is minted to the user address.

Main Exports of this library are

- HeartBitUI - A heart component made with canvas
- HeartBitProvider and useHeartbit - Provider and hook that exposes heartbit mint functionality to its children
- HeartBit - A Plug and Play integration of the HeartBitUI and HeartBitProvider

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
