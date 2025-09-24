# 🎨 SVG Glyph

**An on-chain generative art NFT project built with Arbitrum Stylus.**

---

## 📖 About The Project

SVG Glyph is a proof-of-concept NFT collection that explores the power of Arbitrum Stylus to perform computationally intensive tasks directly on the blockchain. Unlike traditional NFT projects that store their assets on external services like IPFS, each SVG Glyph's artwork is **generated and stored entirely on-chain**.

When a user mints a Glyph, the smart contract uses a unique seed (derived from the minter's address and `tokenId`) to execute a Rust-based algorithm. This algorithm procedurally generates a unique SVG image, which is then stored directly within the NFT's metadata.

This approach demonstrates the high performance and low cost of Stylus, which makes complex on-chain computation not just possible, but practical.

### ✨ Key Features

* **Fully On-Chain:** Both logic and artwork are 100% on the Arbitrum blockchain.
* **Generative Art:** Each NFT is unique, created by a deterministic algorithm written in Rust.
* **Efficient & Low-Cost:** Built on Arbitrum Stylus to leverage the speed of WASM for tasks that would be too expensive in standard Solidity.

---

## 🛠️ Tech Stack

* **Blockchain:** [Arbitrum](https://arbitrum.io/)
* **Smart Contracts:** [Arbitrum Stylus](https://docs.arbitrum.io/stylus/stylus-gentle-introduction) (Rust SDK)
* **NFT Standard:** ERC-721
* **Development Framework:** [Foundry](https://book.getfoundry.sh/) or [Hardhat](https://hardhat.org/)
* **Frontend:** [Vite](https://vitejs.dev/) + [React](https://reactjs.org/) / [Vue](https://vuejs.org/)
* **Web3 Library:** [Ethers.js](https://ethers.org/) or [Viem](https://viem.sh/)

---

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

* **Rust Toolchain:** Install from [rust-lang.org](https://www.rust-lang.org/tools/install)
    ```sh
    curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
    ```
* **Node.js & npm:** Install from [nodejs.org](https://nodejs.org/en/)
* **Foundry (Recommended):** Install from [getfoundry.sh](https://getfoundry.sh)
    ```sh
    curl -L https://foundry.paradigm.xyz | bash
    ```

### Installation

1.  **Clone the repo**
    ```sh
    git clone https://github.com/your-username/svg-glyph.git
    ```
2.  **Navigate to the project directory**
    ```sh
    cd svg-glyph
    ```
3.  **Install frontend dependencies**
    ```sh
    cd frontend && npm install
    ```
4.  **Build the smart contract**
    ```sh
    cd ../contracts && forge build
    ```

---

## 🏗️ Project Structure

```
svg-glyph/
├── contracts/          # Arbitrum Stylus smart contract (Rust)
│   ├── src/
│   │   ├── lib.rs
│   │   └── glyph.rs
│   ├── Cargo.toml
│   └── foundry.toml
├── frontend/           # React/Vite frontend
│   ├── src/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── utils/
│   │   └── App.jsx
│   ├── package.json
│   └── vite.config.js
|
├── .gitignore
└── README.md
```

## 📊 Interacting with the Contract

### Using Cast (Foundry)

```sh
cast send 0x549Dd9B51380d0884A89Ed97ddDfFeB19b3919ED \
--rpc-url <arb-sep-rpc-url> \
--private-key <private-key> #OR --account <account> \
"mint()"
```
