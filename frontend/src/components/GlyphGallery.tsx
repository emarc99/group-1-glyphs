import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { CONTRACT_CONFIG, CONTRACT_ABI, parseTokenURI } from "../utils/contract";
import "./GlyphGallery.css";

interface GlyphGalleryProps {
  userTokens: string[];
  connectedAddress: string;
}

interface MockGlyph {
  tokenId: string;
  svg: string;
  name: string;
}

function GlyphGallery({ userTokens }: GlyphGalleryProps) {
  const [glyphs, setGlyphs] = useState<MockGlyph[]>([]);
  const [loading, setLoading] = useState(true);

  // Mock SVG generator for preview purposes
  const generateMockSVG = (tokenId: string): string => {
    const colors = [
      ["#ff6b6b", "#4ecdc4", "#45b7d1"],
      ["#ff9f43", "#10ac84", "#ee5a6f"],
      ["#5f27cd", "#00d2d3", "#ff9ff3"],
      ["#54a0ff", "#5f27cd", "#ff6b6b"],
    ];

    const colorSet = colors[parseInt(tokenId) % colors.length];
    const numPaths = 3 + (parseInt(tokenId) % 5);

    let paths = "";
    for (let i = 0; i < numPaths; i++) {
      const y = 200 + i * 150;
      const curviness = 50 + (parseInt(tokenId + i.toString()) % 100);
      paths += `<path d="M 100,${y} Q 300,${y - curviness} 500,${y} Q 700,${
        y + curviness
      } 900,${y}" 
                stroke="${
                  colorSet[i % colorSet.length]
                }" stroke-width="12" fill="none" stroke-linecap="round"/>`;
    }

    return `<svg width="1000" height="1000" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#1a1a1a"/>
      ${paths}
    </svg>`;
  };

  useEffect(() => {
    const loadGlyphs = async () => {
      setLoading(true);

      try {
        if (!window.ethereum) {
          console.error("No ethereum provider found");
          setLoading(false);
          return;
        }

        const provider = new ethers.BrowserProvider(window.ethereum);
        const contract = new ethers.Contract(
          CONTRACT_CONFIG.address,
          CONTRACT_ABI,
          provider
        );

        const loadedGlyphs: MockGlyph[] = [];

        for (const tokenId of userTokens) {
          try {
            const tokenURI = await contract.tokenURI(tokenId);
            const metadata = parseTokenURI(tokenURI);

            if (metadata) {
              loadedGlyphs.push({
                tokenId,
                svg: metadata.svgData,
                name: metadata.name || `Glyph #${tokenId}`,
              });
            } else {
              loadedGlyphs.push({
                tokenId,
                svg: generateMockSVG(tokenId),
                name: `Glyph #${tokenId}`,
              });
            }
          } catch (error) {
            console.error(`Error loading token ${tokenId}:`, error);
            loadedGlyphs.push({
              tokenId,
              svg: generateMockSVG(tokenId),
              name: `Glyph #${tokenId}`,
            });
          }
        }

        setGlyphs(loadedGlyphs);
      } catch (error) {
        console.error("Error loading glyphs:", error);
      } finally {
        setLoading(false);
      }
    };

    loadGlyphs();
  }, [userTokens]);

  if (loading) {
    return (
      <section className="gallery-section" id="gallery">
        <div className="gallery-container">
          <h2>🖼️ Your Glyph Collection</h2>
          <div className="loading-state">
            <div className="loading-spinner">⏳</div>
            <p>Loading your Glyphs...</p>
          </div>
        </div>
      </section>
    );
  }

  if (glyphs.length === 0) {
    return (
      <section className="gallery-section" id="gallery">
        <div className="gallery-container">
          <h2>🖼️ Your Glyph Collection</h2>
          <div className="empty-state">
            <div className="empty-icon">📭</div>
            <h3>No Glyphs Yet</h3>
            <p>Mint your first Glyph to start your collection!</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="gallery-section" id="gallery">
      <div className="gallery-container">
        <div className="gallery-header">
          <h2>🖼️ Your Glyph Collection</h2>
          <div className="collection-stats">
            <span className="stat-item">
              <span className="stat-value">{glyphs.length}</span>
              <span className="stat-label">Glyphs Owned</span>
            </span>
          </div>
        </div>

        <div className="glyphs-grid">
          {glyphs.map((glyph) => (
            <div key={glyph.tokenId} className="glyph-card">
              <div className="glyph-image">
                <div
                  className="svg-container"
                  dangerouslySetInnerHTML={{ __html: glyph.svg }}
                />
              </div>
              <div className="glyph-info">
                <h3 className="glyph-name">{glyph.name}</h3>
                <p className="glyph-id">Token ID: {glyph.tokenId}</p>
                <div className="glyph-actions">
                  <button className="action-btn view-btn">
                    <span>👁️</span>
                    View Details
                  </button>
                  <button
                    className="action-btn download-btn"
                    onClick={() => {
                      const blob = new Blob([glyph.svg], {
                        type: "image/svg+xml",
                      });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement("a");
                      a.href = url;
                      a.download = `glyph-${glyph.tokenId}.svg`;
                      a.click();
                      URL.revokeObjectURL(url);
                    }}
                  >
                    <span>💾</span>
                    Download SVG
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default GlyphGallery;
