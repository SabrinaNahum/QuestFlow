"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Bookmark, Share2, Signal } from "lucide-react";
import { useAccount } from "wagmi";

import { AppShell } from "@/components/app-shell";
import { QuestActions } from "@/components/quest-actions";
import { quests } from "@/lib/mock-data";
import { trackEvent } from "@/utils/track";
import { QUESTFLOW_APP_ID, QUESTFLOW_APP_NAME } from "@/lib/quest-contract";

function QuestDetailContent({ id }: { id: string }) {
  const { address } = useAccount();
  const quest = quests.find((item) => item.id === Number(id)) ?? quests[0];

  // 追踪 quest 查看
  useEffect(() => {
    trackEvent(QUESTFLOW_APP_ID, QUESTFLOW_APP_NAME, address, 'quest_view', {
      quest_id: id,
      quest_title: quest.title,
      quest_category: quest.category
    });
  }, [id, quest.title, quest.category, address]);

  return (
    <AppShell activePath="/">
      <div className="space-y-4 pb-40 pt-6">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm">
            <ArrowLeft className="h-4 w-4" />
            Back
          </Link>
          <div className="flex gap-2">
            <button className="rounded-full border border-white/10 bg-white/5 p-3">
              <Bookmark className="h-4 w-4" />
            </button>
            <button className="rounded-full border border-white/10 bg-white/5 p-3">
              <Share2 className="h-4 w-4" />
            </button>
          </div>
        </div>

        <section className="glass-panel gradient-stroke rounded-[32px] p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-accent">{quest.status}</p>
              <h1 className="mt-2 text-4xl font-semibold">{quest.title}</h1>
              <p className="mt-3 text-sm text-white/55">{quest.category} mission</p>
            </div>
            <div className="rounded-[24px] border border-white/10 bg-white/5 px-4 py-3 text-right">
              <p className="text-xs text-white/40">Reward</p>
              <p className="mt-2 text-2xl font-semibold text-success">{quest.reward}</p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <div className="rounded-[24px] border border-white/8 bg-black/10 p-4">
              <p className="text-xs text-white/40">Deadline</p>
              <p className="mt-2 text-lg font-semibold">{quest.timeLeft}</p>
            </div>
            <div className="rounded-[24px] border border-white/8 bg-black/10 p-4">
              <p className="text-xs text-white/40">Hunters</p>
              <p className="mt-2 text-lg font-semibold">{quest.people}/{quest.maxPeople}</p>
            </div>
            <div className="rounded-[24px] border border-white/8 bg-black/10 p-4">
              <p className="text-xs text-white/40">Difficulty</p>
              <p className="mt-2 text-lg font-semibold">Lv {quest.difficulty}</p>
            </div>
            <div className="rounded-[24px] border border-white/8 bg-black/10 p-4">
              <p className="text-xs text-white/40">Signal</p>
              <p className="mt-2 flex items-center gap-2 text-lg font-semibold">
                <Signal className="h-4 w-4 text-accent" />
                Live
              </p>
            </div>
          </div>
        </section>

        <section className="grid gap-3">
          {[
            { title: "Step 1", note: "Open the quest lane" },
            { title: "Step 2", note: "Complete the required onchain or social action" },
            { title: "Step 3", note: "Return and claim the reward instantly" }
          ].map((step, index) => (
            <article key={step.title} className="glass-panel gradient-stroke rounded-[28px] p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-white/45">{step.title}</p>
                  <h2 className="mt-1 text-xl font-semibold">{step.note}</h2>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-sm text-white/70">
                  0{index + 1}
                </div>
              </div>
            </article>
          ))}
        </section>
      </div>
      <QuestActions questId={quest.id} />
    </AppShell>
  );
}

export default async function QuestDetailPage({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <QuestDetailContent id={id} />;
}
