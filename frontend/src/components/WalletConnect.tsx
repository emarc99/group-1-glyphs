import "./WalletConnect.css";

interface WalletConnectProps {
  isConnected: boolean;
  address: string | null;
  onConnect: () => void;
  onDisconnect: () => void;
}

function WalletConnect({
  isConnected,
  address,
  onConnect,
  onDisconnect,
}: WalletConnectProps) {
  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  if (isConnected && address) {
    return (
      <section className="wallet-section connected">
        <div className="wallet-info">
          <div className="wallet-status">
            <span className="status-dot"></span>
            <span>Connected</span>
          </div>
          <div className="wallet-address">{formatAddress(address)}</div>
        </div>
        <button className="disconnect-btn" onClick={onDisconnect}>
          Disconnect
        </button>
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
