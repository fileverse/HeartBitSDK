# HeartBitSDK

## Introduction

### Overview
HeartBit is a free open-source SDK to deploy time-based ‘onchain likes’ to any dApp and  website. The SDK is designed for easy integration and enables a new metric for user interaction, broadening the scope of how appreciation and engagement are quantified onchain. HeartBit is currently compatible with Base and will soon be available across most EVM-based chains.

### Why HeartBit? 

The SDK introduces a new way to engage onchain, transforming how appreciation is expressed. Unlike traditional web2 likes which are ephemeral and hold no tangible value, HeartBit lets users share their time - a sincere, measurable token of appreciation for content they love. This onchain metric not only adds value but also depth to user interactions: it’s a meaningful way to show onchain love.

With just a click on a heart, up to 6 seconds, users can give HeartBits to their favorite content. Each second a user stays clicked up mints ERC1155 tokens. Now every dApp; NFT; digital garden; video; article; web page etc. can have granular onchain analytics. Deepen your users’ analytics from Daily/Monthly Active Users to Seconds Active Users. 


### Supported Networks
We currently only support Base and Sepolia



## Components

This repository contain two packages:

### Heartbit React
This is a plug and play integration of the heartbit sdk. it is a wrapper around [HeartBitCore]((https://github.com/fileverse/HeartBitSDK/tree/main/packages/heartbit-core))

#### Relevant Links
- [HeartBit React](https://github.com/fileverse/HeartBitSDK/tree/main/packages/heartbit-react)
- [@fileverse/heartbit-react](https://www.npmjs.com/package/@fileverse/heartbit-react)




### HeartBit Core
This is the basis of the heartbit functionality. it exposes the APIs that are used to implement the heartbit functionality 
#### Relevant Links
- [HeartBit Core](https://github.com/fileverse/HeartBitSDK/tree/main/packages/heartbit-core)
- [@fileverse/heartbit-core](https://www.npmjs.com/package/@fileverse/heartbit-core)


### HeartBit Contract
The HeartMint smart contract is a ERC1155-based contract on the Ethereum blockchain designed to facilate minting of ERC1155 nfts to users. It features role-based access control for enhanced security, supports meta-transactions for user-friendly gasless interactions, and introduces a unique minting mechanism tied to time-based criteria. 

#### Relevant Links
- [HeartBit smart contract](https://github.com/fileverse/fileverse-smartcontracts-v2/blob/feat/base/contracts/heartbit.sol)
- [Etherscan](https://github.com/fileverse/HeartBitSDK/tree/main/packages/heartbit-core)


## Contributing

We welcome contributions from everyone who is willing to improve this project. Here's how you can contribute:

### Reporting Issues

Before creating bug reports, please check the issue tracker to avoid duplicates. When you are creating a bug report, please include as many details as possible.

### Pull Requests

Please follow these steps to have your contribution considered by the maintainers:

1. Use the fork and pull model to make your changes. Fork the repo and make your changes in your fork. This is how you can propose changes to the project.
2. When you're ready with your changes, create a pull request (PR) from your fork back to the original repo.
3. Fill in the [pull request template](LINK_TO_PULL_REQUEST_TEMPLATE) with details about your contribution.
4. Follow the [style guides](LINK_TO_CODING_CONVENTIONS) for coding, documentation, etc.
5. After you submit your pull request, verify that all status checks are passing. If a check is failing, you will need to address the issue.

**After your pull request is merged**, you can safely delete your branch.



### Community
To get help please reach out to us on [X](https://x.com/fileverse) or send us an [email](https://hello@fileverse.io/).
