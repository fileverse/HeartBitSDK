# HeartBitSDK

## Introduction

### Overview
HeartBit is a free open-source SDK to deploy time-based ‘onchain likes’ to any dApp and  website. The SDK is designed for easy integration and enables a new metric for user interaction, broadening the scope of how appreciation and engagement are quantified onchain. HeartBit is currently compatible with Base and will soon be available across most EVM-based chains.

### Why HeartBit? 

The SDK introduces a new way to engage onchain, transforming how appreciation is expressed. Unlike traditional web2 likes which are ephemeral and hold no tangible value, HeartBit lets users share their time - a sincere, measurable token of appreciation for content they love. This onchain metric not only adds value but also depth to user interactions: it’s a meaningful way to show onchain love.

With just a click on a heart, up to 6 seconds, users can give HeartBits to their favorite content. Each second a user stays clicked up mints ERC1155 tokens. Now every dApp; NFT; digital garden; video; article; web page etc. can have granular onchain analytics. Deepen your users’ analytics from Daily/Monthly Active Users to Seconds Active Users. 


### Supported Networks
We currently only support Base and Sepolia



### Resources

This repository contain two packages:

### Heartbit Core
- package : [@fileverse/heartbit-core](https://github.com/fileverse/HeartBitSDK/tree/main/packages/heartbit-core)
- example usage : [Heartbit core sdk example](https://codesandbox.io/p/devbox/heartbit-core-sdk-example-37h7hw)

### Heartbit React
- package : [@fileverse/heartbit-react](https://github.com/fileverse/HeartBitSDK/tree/main/packages/heartbit-react)
- example usage : [Heartbit React example](https://codesandbox.io/p/devbox/hearbit-example-cxr375)



## Quick Start
As a Quick start - one will have to start with the heartbit-react package which exports the HeartBit component, which is a plug and play integration of the heartbit sdk.



### Heartbit React

#### Installation

 You can install using `npm` or `yarn`

 ```javascript
npm install --save @fileverse/heartbit-react

//or

yarn add @fileverse/heartbit-react
```

#### Import packages
import the core component of the package `HeartBit` 
```javascript
import { HeartBit, type SupportedChain } from "@fileverse/heartbit-react";
```

We will be using `SIWE` package to prepare and sign the user message. the code below imports the package after installing it

```javascript
import { SiweMessage } from "siwe";
```

Let's import the following from `ethers`

```javascript
import { BrowserProvider, keccak256, toUtf8Bytes } from "ethers";
```

You can use any wallet provider of your choice e.g wagmi, but we will be going with the `BrowserProvider` as a quick setup.
The `keccak256` util function will be used to generate the hash for the tokenID of the NFT that will be transferred to the user and `toUtf8Bytes` will be used to encode the string that will be used as the tokenID


#### Integrate Heartbit functionality to your component

First of all you want to setup and define the wallet providers and create a react component that will render the `HeartBit` UI and functionalities. we will be using `BrowserProvider` from `ethers` as our provider

```javascript
const MyApp = () => {
  const provider = new BrowserProvider((window as any).ethereum);
  return <HeartBit
          coreOptions={coreOptions}
          getSignatureArgsHook={signMessageHook}
          hash={hash}
          />
}
```

Let's configure the `heartbit-core` through the `HeartBit` component by passing the `coreOptions` as props which is an object of type 
```javascript
type SupportedChain = "0xaa36a7" | "0x2105"; // currently we only support base and sepolia
interface HeartBitCoreOptions {
  chain: SupportedChain;
  rpcUrl?: string;
}
```

Now let's update our componenent to add the configuration
```javascript

const MyApp = () => {
  const provider = new BrowserProvider((window as any).ethereum);
  const coreOptions = {
    chain: "0xaa36a7" as SupportedChain
  }

  return <HeartBit
          coreOptions={coreOptions}
          getSignatureArgsHook={signMessageHook}
          hash={hash}
        />;
}
```

The `HeartBit` component expects the `getSignatureArgsHook` as props, it calls it internally to get the `message,
      signature` and optionally the function can return an `onMintCallback` which will be called after mint is completed

Update your component to define the `getSignatureArgsHook` 

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

  return <HeartBit
          coreOptions={coreOptions}
          getSignatureArgsHook={getSignatureArgsHook }
          hash={hash}
        />;
}

```

Now let's define `hash` which is a keccak256 hash that will be used for generating the tokenId on the smart contract.

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

At this point you should have  a heart on your screen and when you click and hold it for long it should fill up and once released some nfts related to the amount of time spent on clicking the button will be minted to the user




#### Customization

You can basically attach the heartsbit functionality to any UI and not restricted to the love icon. To achieve this the `heartbit-react` package exports  `HeartBitProvider` and `useHeartBit`.  The `HeartBitProvider` will be used to configure the core package with the `coreOptions` it requires. 

Let import and configure the `HeartBitProvider`  and wrap it around our custom component


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

```

The custom componenent in our case `CustomHeartBit`, should ideally hold the logics  and make use of the `useHeartBit` to implement the core functionalities of the package. below is and example code

```javascript
import { useHeartBit } from "@fileverse/heartbit-react"
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

The  `heartbit-react` additionally exports the heart bit UI which independent of the functionalities. below is a code example 

```javascript
import { HeartBitUI } from "@fileverse/heartbit-react";

export const MyApp = () => {
  return <HeartBitUI />;
};

```

it takes the follwing as prop which can be use to implement and customize the heartbit functionality

```javascript
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
type TotalFillRange = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

type DefaultFillRange = 1 | 2 | 3 | 4 | 5;

```

### Heartbit Core
You can make use of the `heartbit-core` if you are looking at having this functionality on a different browser framework other than react.
Lets walk through the process

#### Installation

 You can install using `npm` or `yarn`

 ```javascript
npm install --save @fileverse/heartbit-core

//or

yarn add @fileverse/heartbit-core
```

#### Import  and use package
 ```javascript
import { HeartBitCore } from "@fileverse/heartbit-core";
```

#### Configure package

```javascript
const core = new HeartBitCore({
  chain: "0xaa36a7",
});

```

Now let write a code that utilizes the `HeartBitCore` to mint nft to a particular user, we are going to use a pre-generated `hash` and `signature`, to avoid making the tutorial complex

```javascript
  const message = "Hello World!";
  const signature = "0x...signed message";
  const startTime = 1706898250;
  const endTime = 1706898251;
  const hash = "Hello World"; // keccak256 hash of a string

  await core.mintHeartBit({
    message,
    signature,
    startTime,
    endTime,
    hash,
  });


```

we can get the total supply of a particular nft by using the `getTotalHeartBitCountByHash` 
```javascript
  const totalSupply = await core.getTotalHeartBitCountByHash({ hash });
```
and to get how many nfts a user has minted you simple call  `getHeartBitByUser` 

```javascript
  // Get Total Mints By User
  const walletAddress = "0x...ethaddress";
  const mintsByUser = await core.getHeartBitByUser({
    hash,
    address,
  });
```






# Troubleshooting

# FAQs
- Who pays the gas fees
  - Fileverse relayer




