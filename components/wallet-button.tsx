"use client";

import { useMemo } from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";

function shortAddress(address?: string) {
  if (!address) return "";
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function WalletButton() {
  const { address, isConnected } = useAccount();
  const { connect, connectors, isPending } = useConnect();
  const { disconnect } = useDisconnect();

  const preferredConnectors = useMemo(
    () =>
      connectors.filter((connector) =>
        connector.id === "coinbaseWalletSDK" || connector.id === "injected"
      ),
    [connectors]
  );

  if (isConnected) {
    return (
      <button
        type="button"
        onClick={() => disconnect()}
        className="rounded-full border-0 bg-white px-4 py-2 text-sm font-semibold text-[#0b1020] shadow-pill"
      >
        {shortAddress(address)}
      </button>
    );
  }

  return (
    <div className="flex items-center gap-2">
      {preferredConnectors.map((connector) => (
        <button
          key={connector.uid}
          type="button"
          onClick={() => connect({ connector })}
          disabled={isPending}
          className="rounded-full border-0 bg-white px-4 py-2 text-sm font-semibold text-[#0b1020] shadow-pill disabled:opacity-60"
        >
          {connector.name === "Injected" ? "Injected" : "Coinbase"}
        </button>
      ))}
    </div>
  );
}
