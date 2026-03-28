import { coinbaseWallet, injected } from "@wagmi/connectors";
import { createConfig, http } from "wagmi";
import { base } from "wagmi/chains";
import type { Hex } from "viem";

const BUILDER_CODE = "bc_o39kexmy";

// 使用正确的 ERC-8021 encoded string 确保归因正确
export const DATA_SUFFIX: Hex = "0x62635f6f33396b65786d790b0080218021802180218021802180218021";

export const config = createConfig({
  chains: [base],
  connectors: [
    coinbaseWallet({
      appName: "QuestFlow",
      preference: "smartWalletOnly"
    }),
    injected()
  ],
  transports: {
    [base.id]: http()
  },
  dataSuffix: DATA_SUFFIX
});
