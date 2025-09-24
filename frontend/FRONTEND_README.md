# 🎨 SVG Glyph Frontend

A modern React frontend for the SVG Glyph NFT project, featuring wallet connection and on-chain generative art minting.

## ✨ Features

- **🔗 Wallet Connection**: MetaMask and Web3 wallet integration
- **⚡ Instant Minting**: Mint unique SVG Glyphs directly on Arbitrum
- **🖼️ Gallery View**: Display your collected Glyphs with full on-chain metadata
- **📱 Responsive Design**: Works seamlessly on desktop and mobile
- **🎨 Modern UI**: Clean, gradient-based design system
- **⛓️ Chain Switching**: Automatic Arbitrum network detection and switching

## 🛠️ Tech Stack

- **Framework**: React 19 + TypeScript
- **Build Tool**: Vite
- **Styling**: CSS Modules with custom properties
- **Web3**: Viem + Ethers.js
- **Fonts**: Inter (Google Fonts)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- MetaMask or compatible Web3 wallet

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── Header.tsx      # Navigation header
│   ├── WalletConnect.tsx # Wallet connection UI
│   ├── MintSection.tsx # NFT minting interface
│   ├── GlyphGallery.tsx # Collection gallery
│   └── *.css          # Component styles
├── hooks/              # Custom React hooks
│   └── useWallet.ts   # Wallet connection logic
├── utils/              # Utility functions
│   └── contract.ts    # Contract interactions
├── App.tsx            # Main application
├── main.tsx          # Application entry point
└── index.css         # Global styles
```

## 🔧 Configuration

### Contract Setup

The contract is already configured for Arbitrum Sepolia in `src/utils/contract.ts`:

```typescript
export const CONTRACT_CONFIG = {
  address: "0x549Dd9B51380d0884A89Ed97ddDfFeB19b3919ED",
  chainId: 421614, // Arbitrum Sepolia
  testnetChainId: 421614,
};
```

### Network Configuration

- **Network:** Arbitrum Sepolia
- **Chain ID:** 421614 (0x66eee)
- **RPC URL:** https://sepolia-rollup.arbitrum.io/rpc
- **Block Explorer:** https://sepolia.arbiscan.io

## 🎨 Features Overview

### Wallet Connection

- Connect/disconnect wallet functionality
- Display connected address (truncated)
- Network validation and switching
- Connection status indicators

### Minting Interface

- Single-click minting (free, gas only)
- Real-time transaction tracking
- Success feedback with token ID
- Block explorer link after successful mint
- Automatic token addition to gallery
- Error handling with user-friendly messages

### Gallery View

- **Auto-fetch on connect:** Automatically loads all user's NFTs
- **Event-based indexing:** Uses Transfer events for efficient token discovery
- **On-chain SVG rendering:** Decodes base64 metadata and displays SVG
- **Download functionality:** Export SVG files locally
- **Real-time updates:** New mints appear instantly
- **Responsive grid layout:** Adapts to all screen sizes

## 🚀 Development

```bash
# Start development server (default: http://localhost:5173)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## 🔌 Network Requirements

### For Users
1. Install MetaMask or compatible Web3 wallet
2. Add Arbitrum Sepolia network (auto-prompts on connect)
3. Get testnet ETH from [Arbitrum Sepolia Faucet](https://faucet.quicknode.com/arbitrum/sepolia)

### Automatic Network Switching
- App detects wrong network and prompts user to switch
- One-click network switching to Arbitrum Sepolia
- Network mismatch warnings displayed in UI

## ✅ Integration Complete

- ✅ Contract deployed on Arbitrum Sepolia
- ✅ Wallet connection with auto network switching
- ✅ Real minting with transaction tracking
- ✅ Auto-fetch all user NFTs via Transfer events
- ✅ On-chain SVG rendering and display
- ✅ Download SVG functionality
- ✅ Block explorer integration

## 🐛 Known Limitations

- Contract does not expose `totalSupply()` function (uses event-based fetching instead)
- Transfer event queries may be slow with large token counts
- Requires Arbitrum Sepolia testnet ETH for gas

## 📄 License

MIT License - see the main project LICENSE file for details.
