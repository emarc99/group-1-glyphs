import { useState } from "react";
import { ethers } from "ethers";
import { CONTRACT_CONFIG, CONTRACT_ABI, getErrorMessage } from "../utils/contract";
import "./MintSection.css";

interface MintSectionProps {
  address: string;
  onMintSuccess: (tokenId: string) => void;
}

function MintSection({ onMintSuccess }: MintSectionProps) {
  const [isMinting, setIsMinting] = useState(false);
  const [mintStatus, setMintStatus] = useState<
    "idle" | "minting" | "success" | "error"
  >("idle");

  const handleMint = async () => {
    setIsMinting(true);
    setMintStatus("minting");

    try {
      if (!window.ethereum) {
        throw new Error("Please install MetaMask to mint");
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(
        CONTRACT_CONFIG.address,
        CONTRACT_ABI,
        signer
      );

      const tx = await contract.mint();
      console.log("Transaction sent:", tx.hash);

      const receipt = await tx.wait();
      console.log("Transaction confirmed:", receipt);

      const transferEvent = receipt.logs.find(
        (log: any) => {
          try {
            const parsed = contract.interface.parseLog(log);
            return parsed?.name === "Transfer";
          } catch {
            return false;
          }
        }
      );

      let tokenId = "0";
      if (transferEvent) {
        const parsed = contract.interface.parseLog(transferEvent);
        tokenId = parsed?.args.tokenId.toString() || "0";
      }

      onMintSuccess(tokenId);
      setMintStatus("success");

      setTimeout(() => {
        setMintStatus("idle");
      }, 3000);
    } catch (error) {
      console.error("Minting failed:", error);
      alert(getErrorMessage(error));
      setMintStatus("error");

      setTimeout(() => {
        setMintStatus("idle");
      }, 3000);
    } finally {
      setIsMinting(false);
    }
  };

  return (
    <section className="mint-section" id="mint">
      <div className="mint-container">
        <div className="mint-info">
          <h2>🎨 Mint Your Unique Glyph</h2>
          <p>
            Each Glyph is generated entirely on-chain using a unique seed
            derived from your address. No two Glyphs are the same!
          </p>

          <div className="mint-details">
            <div className="detail-item">
              <span className="detail-label">Price:</span>
              <span className="detail-value">FREE</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Network:</span>
              <span className="detail-value">Arbitrum Sepolia</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Generation:</span>
              <span className="detail-value">100% On-Chain</span>
            </div>
          </div>
        </div>

        <div className="mint-action">
          <div className="mint-preview">
            <div className="preview-placeholder">
              <span className="preview-icon">🎨</span>
              <p>Your unique Glyph will appear here</p>
            </div>
          </div>

          <button
            className={`mint-btn ${mintStatus}`}
            onClick={handleMint}
            disabled={isMinting || mintStatus === "success"}
          >
            {mintStatus === "idle" && (
              <>
                <span className="btn-icon">✨</span>
                Mint Glyph
              </>
            )}
            {mintStatus === "minting" && (
              <>
                <span className="btn-spinner">⏳</span>
                Minting...
              </>
            )}
            {mintStatus === "success" && (
              <>
                <span className="btn-icon">✅</span>
                Minted Successfully!
              </>
            )}
            {mintStatus === "error" && (
              <>
                <span className="btn-icon">❌</span>
                Mint Failed
              </>
            )}
          </button>

          {mintStatus === "success" && (
            <p className="mint-success-text">
              Your Glyph has been minted! Check the gallery below.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

export default MintSection;
