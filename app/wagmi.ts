import { coinbaseWallet, injected } from "@wagmi/connectors";
import { Attribution } from "ox/erc8021";
import { createConfig, http } from "wagmi";
import { base } from "wagmi/chains";

const BUILDER_CODE = "bc_o39kexmy";

export const DATA_SUFFIX = Attribution.toDataSuffix({
  codes: [BUILDER_CODE]
});

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
