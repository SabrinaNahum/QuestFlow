"use client";

import { useEffect, useMemo, useState } from "react";
import { CheckCheck, Loader2, Rocket } from "lucide-react";
import { useAccount, useWaitForTransactionReceipt, useWriteContract } from "wagmi";

import {
  QUEST_CONTRACT_ADDRESS,
  QUESTFLOW_APP_ID,
  QUESTFLOW_APP_NAME,
  baseQuestAbi
} from "@/lib/quest-contract";
import { trackTransaction, trackEvent } from "@/utils/track";

export function QuestActions({ questId }: { questId: number }) {
  const { address } = useAccount();
  const [pendingAction, setPendingAction] = useState<"complete" | "claim" | null>(null);
  const { writeContractAsync, data: hash, isPending } = useWriteContract();

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash
  });

  const disabled = isPending || isConfirming;

  // 自定义业务埋点：交易确认
  useEffect(() => {
    if (isSuccess && hash) {
      trackEvent(QUESTFLOW_APP_ID, QUESTFLOW_APP_NAME, address, 'transaction_confirmed', {
        tx_hash: hash,
        action: pendingAction,
        quest_id: questId
      });
    }
  }, [isSuccess, hash, pendingAction, questId, address]);

  const buttonText = useMemo(() => {
    if (disabled) return "Confirming...";
    if (pendingAction === "claim") return "Claim Reward";
    return "Complete Quest";
  }, [disabled, pendingAction]);

  async function handleComplete() {
    setPendingAction("complete");
    try {
      const txHash = await writeContractAsync({
        abi: baseQuestAbi,
        address: QUEST_CONTRACT_ADDRESS,
        functionName: "completeQuest",
        args: [BigInt(questId)]
      });

      trackTransaction(QUESTFLOW_APP_ID, QUESTFLOW_APP_NAME, address, txHash);
    } catch {
      setPendingAction(null);
    }
  }

  async function handleClaim() {
    setPendingAction("claim");
    try {
      const txHash = await writeContractAsync({
        abi: baseQuestAbi,
        address: QUEST_CONTRACT_ADDRESS,
        functionName: "claimReward",
        args: [BigInt(questId)]
      });

      trackTransaction(QUESTFLOW_APP_ID, QUESTFLOW_APP_NAME, address, txHash);
    } catch {
      setPendingAction(null);
    }
  }

  return (
    <div className="fixed inset-x-4 bottom-24 z-20 mx-auto flex max-w-3xl gap-3">
      <button
        type="button"
        onClick={handleComplete}
        disabled={disabled}
        className="flex flex-1 items-center justify-center gap-2 rounded-full border border-white/10 bg-white px-5 py-4 text-sm font-semibold text-[#0b1020] shadow-pill disabled:cursor-not-allowed disabled:opacity-60"
      >
        {disabled && pendingAction === "complete" ? <Loader2 className="h-4 w-4 animate-spin" /> : <CheckCheck className="h-4 w-4" />}
        {buttonText}
      </button>
      <button
        type="button"
        onClick={handleClaim}
        disabled={disabled}
        className="flex flex-1 items-center justify-center gap-2 rounded-full border border-white/12 bg-primary px-5 py-4 text-sm font-semibold text-white shadow-pill disabled:cursor-not-allowed disabled:opacity-60"
      >
        {disabled && pendingAction === "claim" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Rocket className="h-4 w-4" />}
        Claim Reward
      </button>
    </div>
  );
}
