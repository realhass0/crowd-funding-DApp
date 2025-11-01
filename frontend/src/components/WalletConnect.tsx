import { useState, useEffect } from "react";
import { getUserDisplayName } from "@/utils/userMapping";
import { ethers } from "ethers";
import { getBrowserProvider } from "@/lib/web3";

interface WalletConnectProps {
  onConnect: (account: string, balance: string) => void;
  onDisconnect: () => void;
  externalAccount?: string | null;
  externalBalance?: string;
}

export default function WalletConnect({ onConnect, onDisconnect, externalAccount, externalBalance }: WalletConnectProps) {
  const [isConnecting, setIsConnecting] = useState(false);
  const [account, setAccount] = useState<string | null>(null);
  const [balance, setBalance] = useState<string>("0");

  // Sync with external account/balance if provided (this ensures header syncs when sidebar connects)
  useEffect(() => {
    if (externalAccount !== undefined) {
      setAccount(externalAccount);
      if (externalAccount && externalBalance !== undefined) {
        setBalance(externalBalance);
      } else if (!externalAccount) {
        setBalance("0");
      }
    }
  }, [externalAccount, externalBalance]);

  useEffect(() => {
    checkConnection();
    // Set up global listener for account changes
    if (typeof window !== "undefined") {
      const ethereum = (window as { ethereum?: { on?: (event: string, callback: (accounts: string[]) => void) => void; removeListener?: (event: string, callback: (accounts: string[]) => void) => void } }).ethereum;
      if (ethereum?.on) {
        const handleAccountsChanged = (accounts: string[]) => {
          if (accounts.length > 0) {
            handleAccountChange(accounts[0]);
          } else {
            handleAccountChange(null);
          }
        };
        ethereum.on("accountsChanged", handleAccountsChanged);
        return () => {
          if (ethereum.removeListener) {
            ethereum.removeListener("accountsChanged", handleAccountsChanged);
          }
        };
      }
    }
  }, []);

  async function checkConnection() {
    const provider = getBrowserProvider();
    if (provider) {
      try {
        const accounts = await provider.listAccounts();
        if (accounts.length > 0) {
          await handleAccountChange(accounts[0]);
        }
      } catch (error) {
        console.log("No accounts found");
      }
    }
  }

  // Normalize various event payloads to a checksum address string
  async function handleAccountChange(next: unknown) {
    let addr: string | null = null;

    if (Array.isArray(next)) {
      addr = next[0] ?? null;
    } else if (typeof next === "string") {
      addr = next;
    } else if (next && typeof next === "object" && "address" in next) {
      addr = (next as { address: string }).address;
    }

    if (!addr) {
      // Treat as disconnect
      setAccount(null);
      setBalance("0");
      onDisconnect();
      return;
    }

    setAccount(addr);
    const provider = getBrowserProvider();
    if (provider) {
      try {
        const balance = await provider.getBalance(addr);
      const balanceStr = ethers.formatEther(balance);
      setBalance(balanceStr);
        onConnect(addr, balanceStr);
      } catch (error) {
        console.error("Failed to get balance:", error);
        setBalance("0");
      }
    }
  }

  async function connect() {
    setIsConnecting(true);
    try {
      const provider = getBrowserProvider();
      if (!provider) {
        alert("MetaMask not found! Please install MetaMask.");
        return;
      }

      await provider.send("eth_requestAccounts", []);
      const accounts = await provider.listAccounts();
      if (accounts.length > 0) {
        await handleAccountChange(accounts[0]);
      }

      // Listen for account changes via EIP-1193
      if (typeof window !== "undefined") {
        const ethereum = (window as { ethereum?: { on?: (event: string, callback: (accounts: string[]) => void) => void } }).ethereum;
        if (ethereum?.on) {
          ethereum.on("accountsChanged", (accounts: string[]) => {
            handleAccountChange(accounts);
          });
        }
      }
    } catch (error: unknown) {
      const err = error as { message?: string };
      console.error("Connection failed:", error);
      alert(err.message || "Failed to connect");
    } finally {
      setIsConnecting(false);
    }
  }

  async function disconnect() {
     try {
      const provider = getBrowserProvider();
      if (provider?.send) {
        await provider.send("wallet_revokePermissions", [{ eth_accounts: {} }]);
      }
    } catch {
      // Ignore disconnect errors
    } finally {
    setAccount(null);
    setBalance("0");
    onDisconnect();
    }
  }

  // Use external account/balance if provided, otherwise use local state
  const displayAccount = externalAccount !== undefined ? externalAccount : account;
  const displayBalance = externalBalance !== undefined ? externalBalance : balance;

  if (displayAccount) {
    return (
      <div className="flex items-center gap-3">
        <div className="text-right">
          <div className="text-black font-medium">
            Balance
          </div>
          <div className="text-xs text-gray-500">{parseFloat(displayBalance).toFixed(4)} ETH</div>
        </div>
        <button
          onClick={disconnect}
          className="px-3 py-1.5 text-sm bg-red-400 text-white rounded-lg hover:bg-pink-700 transition-colors"
        >
          Logout
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={connect}
      disabled={isConnecting}
      className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 transition-colors"
    >
      {isConnecting ? "Connecting..." : "Connect MetaMask"}
    </button>
  );
}
