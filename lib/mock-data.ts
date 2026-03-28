export type QuestItem = {
  id: number;
  title: string;
  reward: string;
  rewardValue: number;
  people: number;
  maxPeople: number;
  timeLeft: string;
  status: "Hot" | "New" | "Reward" | "Social";
  category: string;
  difficulty: number;
  location: string;
};

export const stats = [
  { label: "Live Quests", value: "124" },
  { label: "Total Rewards", value: "38.6 ETH" },
  { label: "Hunters Online", value: "9.3k" },
  { label: "New Today", value: "28" }
];

export const filters = ["All", "Hot", "New", "Nearby", "High Reward", "Social"];

export const socialFeed = [
  "0x71d2...bA1e just claimed Neon Walk",
  "0x8a45...1F02 published a Farcaster drop quest",
  "0x4f21...dC81 completed Base Builder Sprint",
  "0x09ad...eE44 unlocked 0.18 ETH from Night Shift Relay"
];

export const quests: QuestItem[] = [
  {
    id: 1,
    title: "Neon Walk",
    reward: "0.08 ETH",
    rewardValue: 0.08,
    people: 38,
    maxPeople: 100,
    timeLeft: "6h",
    status: "Hot",
    category: "Exploration",
    difficulty: 2,
    location: "Downtown"
  },
  {
    id: 2,
    title: "Cast & Collect",
    reward: "0.05 ETH",
    rewardValue: 0.05,
    people: 22,
    maxPeople: 80,
    timeLeft: "9h",
    status: "Social",
    category: "Social",
    difficulty: 1,
    location: "Farcaster"
  },
  {
    id: 3,
    title: "Block Hunt",
    reward: "0.12 ETH",
    rewardValue: 0.12,
    people: 11,
    maxPeople: 30,
    timeLeft: "2d",
    status: "Reward",
    category: "Game",
    difficulty: 4,
    location: "City Grid"
  },
  {
    id: 4,
    title: "Pulse Relay",
    reward: "0.03 ETH",
    rewardValue: 0.03,
    people: 56,
    maxPeople: 120,
    timeLeft: "4h",
    status: "New",
    category: "Social",
    difficulty: 2,
    location: "Base Lane"
  }
];
