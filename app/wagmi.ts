import { injected } from "@wagmi/core";
import { Attribution } from "ox/erc8021";
import { createConfig, http } from "wagmi";
import { base } from "wagmi/chains";

export const DATA_SUFFIX = Attribution.toDataSuffix({
  codes: ["bc_o39kexmy"]
});

export const config = createConfig({
  chains: [base],
  connectors: [injected()],
  transports: {
    [base.id]: http()
  },
  dataSuffix: DATA_SUFFIX
});
