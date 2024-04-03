# HeartBitSDK

## Introduction

### Overview

[Fileverse](https://twitter.com/fileverse) is an onchain collaboration suite serving as an alternative to Notion and Google Workspace. It goes without saying that Fileverse cannot depend on traditional ‘like’ buttons that are just an ephemeral entry on a centralized database.

Introducing HeartBits by Fileverse: provable, time-based onchain "Likes" that people generate by simply engaging with your app, website, onchain media, Frame or OpenAction. The HeartBit SDK enables novel onchain user interactions directly on your app and generates granular user analytics trackable on Dune. This open SDK also allows you to easily deploy Frames (Farcaster) and Open Actions (Lens) with gasless transactions.

Leveraging: Safe Protocol, IPFS, Pimlico, ERC4337, ERC1155, Gnosis Chain, Base, Frog by Paradigm, Frames.js, Farcaster, Lens.

### Why HeartBit?

The HeartBit SDK introduces a new way to engage onchain that transforms how appreciation is expressed online. Unlike traditional web2 ‘likes’ which are ephemeral and hold no tangible value, HeartBit lets users directly share/offer their time–a sincere, measurable token of appreciation for content they love. This onchain metric not only adds value but also depth to user interactions: it’s a meaningful way to show onchain love.

With just a click on a HeartBit, up to 6 seconds, users can give HeartBits to their favorite content, author, peer, anon. Each second a user stays clicked on a HeartBit mints ERC1155 tokens. Now every dApp; NFT; digital garden; video; article; web page, etc. can have granular onchain analytics. Deepen your users’ analytics from Daily/Monthly Active Users to Seconds Active Users


### Supported Networks

We currently support [Gnosis](https://chainlist.org/chain/100), [Base](https://chainlist.org/chain/8453) and [Sepolia](https://chainlist.org/chain/58008), more coming soon!

## Components

This repository contains two packages:

### HeartBit React

This is a plug-and-play integration of the HeartBit SDK. It is a wrapper around [HeartBit Core](https://github.com/fileverse/HeartBitSDK/tree/main/packages/heartbit-core).

#### Relevant Links

- [HeartBit React](https://github.com/fileverse/HeartBitSDK/tree/main/packages/heartbit-react)
- [@fileverse/heartbit-react](https://www.npmjs.com/package/@fileverse/heartbit-react)

### HeartBit Core

This is the foundation of the HeartBit functionality. It exposes the APIs that are essential for implementing the HeartBit capabilities.

#### Relevant Links

- [HeartBit Core](https://github.com/fileverse/HeartBitSDK/tree/main/packages/heartbit-core)
- [@fileverse/heartbit-core](https://www.npmjs.com/package/@fileverse/heartbit-core)

### HeartBit Backend

Relayer Backend for the HeartBitSDK.

#### Relevant Link
- [HeartBit Backend](https://github.com/fileverse/heartbit-backend)


## Contributing

We welcome contributions from everyone who is willing to improve this project! Here's how you can contribute:

### Reporting Issues

Before creating bug reports, please check the [issue tracker](https://github.com/fileverse/HeartBitSDK/issues) to avoid duplicates. When you are creating a bug report, please make sure to follow the [issue template](https://github.com/fileverse/HeartBitSDK/issues/1) with details about your specific isue.

### Pull Requests

Please follow these steps to have your contribution considered by the maintainers:

1. Use the fork and pull model to make your changes. Fork the repo and make your changes in your fork (this is how you can propose changes to the project)
2. When you're ready with your changes, create a pull request (PR) from your fork back to the original repo.
3. Fill in the [pull request template](https://github.com/fileverse/HeartBitSDK/blob/main/PULL_REQUEST_TEMPLATE.md) with details about your contribution.
4. After you submit your pull request, verify that all status checks are passing. If a check is failing, you will need to address the issue.

**After your pull request is merged**, you can safely delete your branch.

### Support

To get help please reach out to our team on [X](https://x.com/fileverse) or send us an [email](mailto:hello@fileverse.io?subject=[Help]HeartBitSDK).
