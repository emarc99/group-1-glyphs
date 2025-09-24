import { useState, useEffect } from 'react'

declare global {
    interface Window {
        ethereum?: any
    }
}

export function useWallet() {
    const [address, setAddress] = useState<string | null>(null)
    const [isConnected, setIsConnected] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    // Check if wallet is already connected on mount
    useEffect(() => {
        checkConnection()
    }, [])

    const checkConnection = async () => {
        if (!window.ethereum) return

        try {
            const accounts = await window.ethereum.request({
                method: 'eth_accounts'
            })

            if (accounts.length > 0) {
                setAddress(accounts[0])
                setIsConnected(true)
            }
        } catch (error) {
            console.error('Error checking wallet connection:', error)
        }
    }

    const connect = async () => {
        if (!window.ethereum) {
            alert('Please install MetaMask or another Web3 wallet')
            return
        }

        setIsLoading(true)
        try {
            const accounts = await window.ethereum.request({
                method: 'eth_requestAccounts'
            })

            if (accounts.length > 0) {
                setAddress(accounts[0])
                setIsConnected(true)
            }
        } catch (error) {
            console.error('Error connecting wallet:', error)
            alert('Failed to connect wallet')
        } finally {
            setIsLoading(false)
        }
    }

    const disconnect = () => {
        setAddress(null)
        setIsConnected(false)
    }

    const switchToArbitrum = async () => {
        if (!window.ethereum) return

        try {
            await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: '0xA4B1' }], // Arbitrum One
            })
        } catch (switchError: any) {
            // This error code indicates that the chain has not been added to MetaMask
            if (switchError.code === 4902) {
                try {
                    await window.ethereum.request({
                        method: 'wallet_addEthereumChain',
                        params: [
                            {
                                chainId: '0xA4B1',
                                chainName: 'Arbitrum One',
                                nativeCurrency: {
                                    name: 'ETH',
                                    symbol: 'ETH',
                                    decimals: 18,
                                },
                                rpcUrls: ['https://arb1.arbitrum.io/rpc'],
                                blockExplorerUrls: ['https://arbiscan.io/'],
                            },
                        ],
                    })
                } catch (addError) {
                    console.error('Error adding Arbitrum network:', addError)
                }
            }
        }
    }

    return {
        address,
        isConnected,
        isLoading,
        connect,
        disconnect,
        switchToArbitrum
    }
}