import type { Abi, Address } from "viem";

export const QUEST_CONTRACT_ADDRESS =
  "0x903332c794cb8d69e2857f7c099f5584269cb4f2" as Address;

export const QUESTFLOW_APP_ID = "app-001";
export const QUESTFLOW_APP_NAME = "QuestFlow";

export const baseQuestAbi = [
  {
    type: "function",
    stateMutability: "payable",
    name: "createQuest",
    inputs: [
      { name: "metaHash", type: "bytes32" },
      { name: "maxUsers", type: "uint32" },
      { name: "category", type: "uint8" },
      { name: "difficulty", type: "uint8" }
    ],
    outputs: []
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    name: "completeQuest",
    inputs: [{ name: "id", type: "uint256" }],
    outputs: []
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    name: "claimReward",
    inputs: [{ name: "id", type: "uint256" }],
    outputs: []
  },
  {
    type: "function",
    stateMutability: "view",
    name: "questId",
    inputs: [],
    outputs: [{ name: "", type: "uint256" }]
  },
  {
    type: "function",
    stateMutability: "view",
    name: "quests",
    inputs: [{ name: "", type: "uint256" }],
    outputs: [
      { name: "creator", type: "address" },
      { name: "reward", type: "uint96" },
      { name: "maxUsers", type: "uint32" },
      { name: "claimed", type: "uint32" },
      { name: "category", type: "uint8" },
      { name: "difficulty", type: "uint8" },
      { name: "active", type: "bool" }
    ]
  }
] as const satisfies Abi;
