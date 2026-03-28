"use client";

import { useEffect, useMemo, useState } from "react";
import { CalendarClock, Loader2, Radar, Sparkles } from "lucide-react";
import { keccak256, parseEther, stringToHex } from "viem";
import { useAccount, useWriteContract } from "wagmi";

import {
  QUEST_CONTRACT_ADDRESS,
  QUESTFLOW_APP_ID,
  QUESTFLOW_APP_NAME,
  baseQuestAbi
} from "@/lib/quest-contract";
import { trackTransaction, trackEvent } from "@/utils/track";

const categories = [
  { label: "Exploration", value: 1 },
  { label: "Social", value: 2 },
  { label: "Game", value: 3 }
];

export function PublishForm() {
  const { address } = useAccount();
  const { writeContractAsync, isPending } = useWriteContract();
  const [title, setTitle] = useState("QuestFlow City Sprint");
  const [rewardPool, setRewardPool] = useState("0.12");
  const [deadline, setDeadline] = useState("2026-04-05T18:30");
  const [category, setCategory] = useState(1);
  const [maxUsers, setMaxUsers] = useState(24);
  const [difficulty, setDifficulty] = useState(3);
  const [verification, setVerification] = useState("Onchain action");

  // 自定义业务埋点：页面浏览
  useEffect(() => {
    trackEvent(QUESTFLOW_APP_ID, QUESTFLOW_APP_NAME, address, 'page_view', {
      page: 'publish'
    });
  }, [address]);

  const metaHash = useMemo(
    () => keccak256(stringToHex(`${title}|${deadline}|${verification}`)),
    [title, deadline, verification]
  );

  async function handlePublish() {
    try {
      const txHash = await writeContractAsync({
        abi: baseQuestAbi,
        address: QUEST_CONTRACT_ADDRESS,
        functionName: "createQuest",
        args: [metaHash, maxUsers, category, difficulty],
        value: parseEther(rewardPool || "0")
      });

      trackTransaction(QUESTFLOW_APP_ID, QUESTFLOW_APP_NAME, address, txHash);
    } catch {
      return;
    }
  }

  return (
    <div className="space-y-4">
      <section className="glass-panel gradient-stroke rounded-[32px] p-5">
        <div className="flex items-center gap-2 text-sm text-accent">
          <Radar className="h-4 w-4" />
          Publish a live incentive
        </div>
        <div className="mt-4 grid gap-4">
          <label className="rounded-[24px] border border-white/8 bg-white/5 p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-white/45">Title</p>
            <input
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              className="mt-3 w-full bg-transparent text-lg font-medium text-white outline-none"
            />
          </label>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="rounded-[24px] border border-white/8 bg-white/5 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-white/45">Reward Pool</p>
              <input
                value={rewardPool}
                onChange={(event) => setRewardPool(event.target.value)}
                className="mt-3 w-full bg-transparent text-lg font-medium text-success outline-none"
              />
            </label>
            <label className="rounded-[24px] border border-white/8 bg-white/5 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-white/45">Max Hunters</p>
              <input
                type="number"
                value={maxUsers}
                onChange={(event) => setMaxUsers(Number(event.target.value))}
                className="mt-3 w-full bg-transparent text-lg font-medium text-white outline-none"
              />
            </label>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="rounded-[24px] border border-white/8 bg-white/5 p-4">
              <p className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-white/45">
                <CalendarClock className="h-4 w-4" />
                Deadline
              </p>
              <input
                type="datetime-local"
                value={deadline}
                onChange={(event) => setDeadline(event.target.value)}
                className="mt-3 w-full bg-transparent text-sm font-medium text-white outline-none"
              />
            </label>
            <label className="rounded-[24px] border border-white/8 bg-white/5 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-white/45">Verification</p>
              <input
                value={verification}
                onChange={(event) => setVerification(event.target.value)}
                className="mt-3 w-full bg-transparent text-sm font-medium text-white outline-none"
              />
            </label>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="rounded-[24px] border border-white/8 bg-white/5 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-white/45">Category</p>
              <select
                value={category}
                onChange={(event) => setCategory(Number(event.target.value))}
                className="mt-3 w-full bg-transparent text-sm font-medium text-white outline-none"
              >
                {categories.map((item) => (
                  <option key={item.value} value={item.value} className="bg-[#10162a]">
                    {item.label}
                  </option>
                ))}
              </select>
            </label>
            <label className="rounded-[24px] border border-white/8 bg-white/5 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-white/45">Difficulty</p>
              <input
                type="range"
                min={1}
                max={5}
                value={difficulty}
                onChange={(event) => setDifficulty(Number(event.target.value))}
                className="mt-4 w-full"
              />
              <p className="mt-3 text-sm text-white/70">Level {difficulty}</p>
            </label>
          </div>
        </div>
      </section>

      <section className="glass-panel gradient-stroke rounded-[32px] p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-white/55">Builder Preview</p>
            <h2 className="mt-1 text-2xl font-semibold">Ready to broadcast</h2>
          </div>
          <Sparkles className="h-5 w-5 text-accent" />
        </div>
        <div className="mt-4 grid grid-cols-3 gap-3 text-sm">
          <div className="rounded-[22px] border border-white/8 bg-white/5 p-3">
            <p className="text-white/40">Pool</p>
            <p className="mt-2 font-semibold">{rewardPool} ETH</p>
          </div>
          <div className="rounded-[22px] border border-white/8 bg-white/5 p-3">
            <p className="text-white/40">Meta</p>
            <p className="mt-2 truncate font-semibold">{metaHash.slice(0, 10)}...</p>
          </div>
          <div className="rounded-[22px] border border-white/8 bg-white/5 p-3">
            <p className="text-white/40">Mode</p>
            <p className="mt-2 font-semibold">{verification}</p>
          </div>
        </div>
      </section>

      <div className="fixed inset-x-4 bottom-24 z-20 mx-auto max-w-3xl">
        <button
          type="button"
          onClick={handlePublish}
          disabled={isPending}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-white px-5 py-4 text-sm font-semibold text-[#0b1020] shadow-pill disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
          Publish Now
        </button>
      </div>
    </div>
  );
}
