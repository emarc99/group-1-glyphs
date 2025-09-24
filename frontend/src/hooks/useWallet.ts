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
    const [chainId, setChainId] = useState<number | null>(null)

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

                const chainIdHex = await window.ethereum.request({
                    method: 'eth_chainId'
                })
                setChainId(parseInt(chainIdHex, 16))
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

                const chainIdHex = await window.ethereum.request({
                    method: 'eth_chainId'
                })
                const currentChainId = parseInt(chainIdHex, 16)
                setChainId(currentChainId)

                if (currentChainId !== 421614) {
                    await switchToArbitrum()
                }
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
                params: [{ chainId: '0x66eee' }],
            })
        } catch (switchError: any) {
            if (switchError.code === 4902) {
                try {
                    await window.ethereum.request({
                        method: 'wallet_addEthereumChain',
                        params: [
                            {
                                chainId: '0x66eee',
                                chainName: 'Arbitrum Sepolia',
                                nativeCurrency: {
                                    name: 'ETH',
                                    symbol: 'ETH',
                                    decimals: 18,
                                },
                                rpcUrls: ['https://sepolia-rollup.arbitrum.io/rpc'],
                                blockExplorerUrls: ['https://sepolia.arbiscan.io/'],
                            },
                        ],
                    })
                } catch (addError) {
                    console.error('Error adding Arbitrum Sepolia network:', addError)
                }
            }
        }
    }

    useEffect(() => {
        if (!window.ethereum) return

        const handleChainChanged = (chainIdHex: string) => {
            setChainId(parseInt(chainIdHex, 16))
            window.location.reload()
        }

        const handleAccountsChanged = (accounts: string[]) => {
            if (accounts.length > 0) {
                setAddress(accounts[0])
            } else {
                disconnect()
            }
        }

        window.ethereum.on('chainChanged', handleChainChanged)
        window.ethereum.on('accountsChanged', handleAccountsChanged)

        return () => {
            window.ethereum?.removeListener('chainChanged', handleChainChanged)
            window.ethereum?.removeListener('accountsChanged', handleAccountsChanged)
        }
    }, [])

    return {
        address,
        isConnected,
        isLoading,
        chainId,
        connect,
        disconnect,
        switchToArbitrum
    }
}