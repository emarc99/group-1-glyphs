// Contract configuration
export const CONTRACT_CONFIG = {
    address: '0x549Dd9B51380d0884A89Ed97ddDfFeB19b3919ED',
    chainId: 421614,
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
        chainIdHex: '0x66eee',
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

// Fetch all token IDs owned by a user using Transfer events
export async function fetchUserTokens(userAddress: string, provider: any): Promise<string[]> {
    try {
        const { ethers } = await import('ethers')
        const contract = new ethers.Contract(
            CONTRACT_CONFIG.address,
            CONTRACT_ABI,
            provider
        )

        console.log('Fetching Transfer events for user:', userAddress)

        // Query all Transfer events where 'to' is the user address
        const filter = contract.filters.Transfer(null, userAddress)
        const events = await contract.queryFilter(filter, 0, 'latest')

        console.log('Transfer events found:', events.length)

        const userTokens: string[] = []
        const tokenSet = new Set<string>()

        // Check each token to see if user still owns it
        for (const event of events) {
            if ('args' in event) {
                const tokenId = event.args?.tokenId?.toString()
                if (tokenId && !tokenSet.has(tokenId)) {
                    try {
                        const owner = await contract.ownerOf(tokenId)
                        console.log(`Token ${tokenId} owner:`, owner)
                        if (owner.toLowerCase() === userAddress.toLowerCase()) {
                            userTokens.push(tokenId)
                            tokenSet.add(tokenId)
                        }
                    } catch (error) {
                        console.error(`Error checking token ${tokenId}:`, error)
                    }
                }
            }
        }

        console.log('User tokens found:', userTokens)
        return userTokens.sort((a, b) => Number(a) - Number(b))
    } catch (error) {
        console.error('Error fetching user tokens:', error)
        return []
    }
}