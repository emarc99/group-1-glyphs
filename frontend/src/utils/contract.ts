// Contract configuration
export const CONTRACT_CONFIG = {
    // TODO: Replace with actual contract address after deployment
    address: '0x0000000000000000000000000000000000000000',
    // Arbitrum One Chain ID
    chainId: 42161,
    // Arbitrum Sepolia for testing
    testnetChainId: 421614,
} as const

// Contract ABI - simplified for basic ERC721 + mint functionality
export const CONTRACT_ABI = [
    // ERC721 Standard functions
    'function name() view returns (string)',
    'function symbol() view returns (string)',
    'function tokenURI(uint256 tokenId) view returns (string)',
    'function ownerOf(uint256 tokenId) view returns (address)',
    'function balanceOf(address owner) view returns (uint256)',

    // Custom functions
    'function mint() payable returns (uint256)',
    'function totalSupply() view returns (uint256)',

    // Events
    'event Transfer(address indexed from, address indexed to, uint256 indexed tokenId)',
    'event Mint(address indexed to, uint256 indexed tokenId)',
] as const

// Network configurations
export const NETWORKS = {
    arbitrum: {
        chainId: 42161,
        name: 'Arbitrum One',
        rpcUrl: 'https://arb1.arbitrum.io/rpc',
        blockExplorer: 'https://arbiscan.io',
        nativeCurrency: {
            name: 'ETH',
            symbol: 'ETH',
            decimals: 18,
        },
    },
    arbitrumSepolia: {
        chainId: 421614,
        name: 'Arbitrum Sepolia',
        rpcUrl: 'https://sepolia-rollup.arbitrum.io/rpc',
        blockExplorer: 'https://sepolia.arbiscan.io',
        nativeCurrency: {
            name: 'ETH',
            symbol: 'ETH',
            decimals: 18,
        },
    },
} as const

// Helper function to get network info
export function getNetworkInfo(chainId: number) {
    switch (chainId) {
        case 42161:
            return NETWORKS.arbitrum
        case 421614:
            return NETWORKS.arbitrumSepolia
        default:
            return null
    }
}

// Helper function to format addresses
export function formatAddress(address: string): string {
    if (!address) return ''
    return `${address.slice(0, 6)}...${address.slice(-4)}`
}

// Helper function to parse token URI and extract SVG
export function parseTokenURI(tokenURI: string): { name: string; description: string; svgData: string } | null {
    try {
        // Handle data URI format: data:application/json;base64,xxx
        if (tokenURI.startsWith('data:application/json;base64,')) {
            const base64Data = tokenURI.replace('data:application/json;base64,', '')
            const jsonString = atob(base64Data)
            const metadata = JSON.parse(jsonString)

            // Extract SVG data from image field
            let svgData = ''
            if (metadata.image && metadata.image.startsWith('data:image/svg+xml;base64,')) {
                const svgBase64 = metadata.image.replace('data:image/svg+xml;base64,', '')
                svgData = atob(svgBase64)
            }

            return {
                name: metadata.name || 'Unnamed Glyph',
                description: metadata.description || '',
                svgData
            }
        }

        return null
    } catch (error) {
        console.error('Error parsing token URI:', error)
        return null
    }
}

// Error handling helper
export function getErrorMessage(error: any): string {
    if (error?.message) {
        // Handle common wallet errors
        if (error.message.includes('user rejected')) {
            return 'Transaction was rejected by user'
        }
        if (error.message.includes('insufficient funds')) {
            return 'Insufficient funds for transaction'
        }
        if (error.message.includes('network')) {
            return 'Network error. Please check your connection'
        }
        return error.message
    }

    return 'An unknown error occurred'
}