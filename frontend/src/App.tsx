import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import WalletConnect from "./components/WalletConnect";
import GlyphGallery from "./components/GlyphGallery";
import MintSection from "./components/MintSection";
import { useWallet } from "./hooks/useWallet";

function App() {
  const { address, isConnected, chainId, connect, disconnect, switchToArbitrum } = useWallet();
  const [userTokens, setUserTokens] = useState<string[]>([]);

  return (
    <div className="app">
      <Header />

      <main className="main-content">
        <section className="hero">
          <h1>🎨 SVG Glyphs</h1>
          <p>Fully on-chain generative art NFTs powered by Arbitrum Stylus</p>
        </section>

        <WalletConnect
          isConnected={isConnected}
          address={address}
          chainId={chainId}
          onConnect={connect}
          onDisconnect={disconnect}
          onSwitchNetwork={switchToArbitrum}
        />

        {isConnected && (
          <>
            <MintSection
              address={address!}
              onMintSuccess={(tokenId: string) => {
                setUserTokens((prev) => [...prev, tokenId]);
              }}
            />

            <GlyphGallery userTokens={userTokens} connectedAddress={address!} />
          </>
        )}
      </main>

      <footer className="footer">
        <p>Built with Arbitrum Stylus • Rust-powered on-chain generation</p>
      </footer>
    </div>
  );
}

export default App;
