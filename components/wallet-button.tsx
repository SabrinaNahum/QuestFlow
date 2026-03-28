"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";

export function WalletButton() {
  return (
    <div className="[&_button]:rounded-full [&_button]:border-0 [&_button]:bg-white [&_button]:px-4 [&_button]:text-[#0b1020] [&_button]:shadow-pill">
      <ConnectButton chainStatus="icon" showBalance={false} />
    </div>
  );
}
