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
