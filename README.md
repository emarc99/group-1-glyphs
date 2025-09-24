# 🎨 SVG Glyphs

**An on-chain generative art NFT project built with Arbitrum Stylus.**

🔗 **Live on Arbitrum Sepolia:** [`0x549Dd9B51380d0884A89Ed97ddDfFeB19b3919ED`](https://sepolia.arbiscan.io/address/0x549Dd9B51380d0884A89Ed97ddDfFeB19b3919ED)

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

* **Blockchain:** [Arbitrum Sepolia](https://arbitrum.io/) (Testnet)
* **Smart Contracts:** [Arbitrum Stylus](https://docs.arbitrum.io/stylus/stylus-gentle-introduction) (Rust SDK)
* **NFT Standard:** ERC-721
* **Frontend:** [Vite](https://vitejs.dev/) + [React 19](https://reactjs.org/) + TypeScript
* **Web3 Library:** [Ethers.js v6](https://ethers.org/)
* **Contract Address:** `0x549Dd9B51380d0884A89Ed97ddDfFeB19b3919ED`

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
    cd ../contracts && cargo stylus check
    ```
5.  **Run the frontend**
    ```sh
    cd ../frontend && npm run dev
    ```

---

## 🏗️ Project Structure

```
group-1-glyphs/
├── contracts/          # Arbitrum Stylus smart contract (Rust)
│   ├── src/
│   │   ├── lib.rs          # Main contract logic
│   │   ├── generator.rs    # SVG generation algorithm
│   │   ├── base64.rs       # Base64 encoding utilities
│   │   └── main.rs         # Entry point
│   ├── Cargo.toml
│   └── rust-toolchain.toml
├── frontend/           # React + TypeScript frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── hooks/          # Custom hooks (useWallet)
│   │   ├── utils/          # Contract utilities
│   │   └── App.tsx         # Main app component
│   ├── package.json
│   └── vite.config.ts
├── .gitignore
└── README.md
```

## 📊 Using the DApp

### Deployed Contract

**Network:** Arbitrum Sepolia
**Contract Address:** `0x549Dd9B51380d0884A89Ed97ddDfFeB19b3919ED`
**Block Explorer:** [View on Arbiscan](https://sepolia.arbiscan.io/address/0x549Dd9B51380d0884A89Ed97ddDfFeB19b3919ED)

### Frontend Features

✅ **Wallet Connection**
- Automatic Arbitrum Sepolia network switching
- MetaMask integration
- Network mismatch warnings

✅ **NFT Minting**
- Free minting (gas only)
- Real-time transaction tracking
- Block explorer link after mint
- Displays minted token ID

✅ **Auto-Fetch Gallery**
- Automatically loads all user's NFTs on wallet connect
- Uses Transfer event indexing for efficient fetching
- Displays on-chain generated SVG art
- Download SVG functionality

### Interacting with the Contract (CLI)

```sh
# Mint a Glyph
cast send 0x549Dd9B51380d0884A89Ed97ddDfFeB19b3919ED \
--rpc-url https://sepolia-rollup.arbitrum.io/rpc \
--private-key <your-private-key> \
"mint()"

# Get token URI
cast call 0x549Dd9B51380d0884A89Ed97ddDfFeB19b3919ED \
--rpc-url https://sepolia-rollup.arbitrum.io/rpc \
"tokenURI(uint256)" <token-id>

# Check ownership
cast call 0x549Dd9B51380d0884A89Ed97ddDfFeB19b3919ED \
--rpc-url https://sepolia-rollup.arbitrum.io/rpc \
"ownerOf(uint256)" <token-id>
```

## 🎨 How It Works

1. **User connects wallet** → Frontend auto-fetches all owned NFTs via Transfer events
2. **User clicks mint** → Contract generates unique seed from block data + user address
3. **Rust algorithm runs on-chain** → Generates deterministic SVG based on seed
4. **SVG embedded in tokenURI** → Base64-encoded metadata stored on-chain
5. **Frontend displays NFT** → Decodes and renders the SVG art

## 🔗 Links

- [Arbitrum Sepolia Faucet](https://faucet.quicknode.com/arbitrum/sepolia)
- [Arbitrum Stylus Docs](https://docs.arbitrum.io/stylus/stylus-gentle-introduction)
- [Contract Explorer](https://sepolia.arbiscan.io/address/0x549Dd9B51380d0884A89Ed97ddDfFeB19b3919ED)
