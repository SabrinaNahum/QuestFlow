import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { coinbaseWallet, injectedWallet } from "@rainbow-me/rainbowkit/wallets";
import { Attribution } from "ox/erc8021";
import { base } from "wagmi/chains";

const BUILDER_CODE = "BUILDER_CODE_PLACEHOLDER";
export const DATA_SUFFIX = Attribution.toDataSuffix({
  appCode: BUILDER_CODE
});

const configParameters = {
  appName: "QuestFlow",
  appDescription: "链上任务发布与完成，参与即得奖励",
  appUrl: "https://questflow.vercel.app",
  chains: [base],
  ssr: true,
  wallets: [
    {
      groupName: "Recommended",
      wallets: [coinbaseWallet, injectedWallet]
    }
  ],
  dataSuffix: DATA_SUFFIX
};

export const config = getDefaultConfig(
  configParameters as unknown as Parameters<typeof getDefaultConfig>[0]
);
