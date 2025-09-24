import "./WalletConnect.css";

interface WalletConnectProps {
  isConnected: boolean;
  address: string | null;
  chainId?: number | null;
  onConnect: () => void;
  onDisconnect: () => void;
  onSwitchNetwork?: () => void;
}

function WalletConnect({
  isConnected,
  address,
  chainId,
  onConnect,
  onDisconnect,
  onSwitchNetwork,
}: WalletConnectProps) {
  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  const isCorrectNetwork = chainId === 421614;

  if (isConnected && address) {
    return (
      <section className="wallet-section connected">
        <div className="wallet-info">
          <div className="wallet-status">
            <span className="status-dot"></span>
            <span>Connected</span>
          </div>
          <div className="wallet-address">{formatAddress(address)}</div>
          {!isCorrectNetwork && (
            <div className="network-warning" style={{ color: '#ff6b6b', marginTop: '8px', fontSize: '14px' }}>
              ⚠️ Wrong network. Please switch to Arbitrum Sepolia.
            </div>
          )}
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          {!isCorrectNetwork && onSwitchNetwork && (
            <button className="connect-btn" onClick={onSwitchNetwork} style={{ padding: '8px 16px' }}>
              Switch Network
            </button>
          )}
          <button className="disconnect-btn" onClick={onDisconnect}>
            Disconnect
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="wallet-section disconnected">
      <div className="wallet-prompt">
        <h2>Connect Your Wallet</h2>
        <p>Connect your wallet to mint and view your SVG Glyphs</p>
      </div>
      <button className="connect-btn" onClick={onConnect}>
        <span className="btn-icon">👛</span>
        Connect Wallet
      </button>
    </section>
  );
}

export default WalletConnect;
