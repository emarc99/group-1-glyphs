import { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import WalletConnect from "./components/WalletConnect";
import GlyphGallery from "./components/GlyphGallery";
import MintSection from "./components/MintSection";
import { useWallet } from "./hooks/useWallet";
import { fetchUserTokens } from "./utils/contract";
import { ethers } from "ethers";

function App() {
  const { address, isConnected, chainId, connect, disconnect, switchToArbitrum } = useWallet();
  const [userTokens, setUserTokens] = useState<string[]>([]);
  const [isLoadingTokens, setIsLoadingTokens] = useState(false);

  useEffect(() => {
    const loadUserTokens = async () => {
      if (!isConnected || !address || !window.ethereum || chainId !== 421614) {
        setUserTokens([]);
        return;
      }

      setIsLoadingTokens(true);
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const tokens = await fetchUserTokens(address, provider);
        setUserTokens(tokens);
        console.log(`Loaded ${tokens.length} tokens for user:`, tokens);
      } catch (error) {
        console.error('Error loading user tokens:', error);
      } finally {
        setIsLoadingTokens(false);
      }
    };

    loadUserTokens();
  }, [isConnected, address, chainId]);

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
                setUserTokens((prev) => {
                  if (!prev.includes(tokenId)) {
                    return [...prev, tokenId];
                  }
                  return prev;
                });
              }}
            />

            {isLoadingTokens ? (
              <div style={{ textAlign: 'center', padding: '40px', color: '#888' }}>
                <div>⏳ Loading your Glyphs...</div>
              </div>
            ) : (
              <GlyphGallery userTokens={userTokens} connectedAddress={address!} />
            )}
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
