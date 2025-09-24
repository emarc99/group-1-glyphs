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

Update the contract configuration in `src/utils/contract.ts`:

```typescript
export const CONTRACT_CONFIG = {
  address: "YOUR_DEPLOYED_CONTRACT_ADDRESS",
  chainId: 42161, // Arbitrum One
  testnetChainId: 421614, // Arbitrum Sepolia
};
```

## 🎨 Features Overview

### Wallet Connection

- Connect/disconnect wallet functionality
- Display connected address (truncated)
- Network validation and switching
- Connection status indicators

### Minting Interface

- Single-click minting
- Loading states and progress indicators
- Success/error feedback
- Transaction status tracking

### Gallery View

- Display owned Glyphs with SVG rendering
- Token metadata parsing
- Download SVG functionality
- Responsive grid layout

## 🚀 Development

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Lint code
npm run lint
```

## 📝 Next Steps

1. Replace mock functions with actual contract integration
2. Deploy the smart contract and update contract address
3. Test on Arbitrum Sepolia testnet
4. Deploy to production on Arbitrum One

## 📄 License

MIT License - see the main project LICENSE file for details.
