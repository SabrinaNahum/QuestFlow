"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Flame, MapPin, Sparkles, Users2 } from "lucide-react";
import { useAccount } from "wagmi";

import { filters, quests, socialFeed, stats } from "@/lib/mock-data";
import { trackEvent } from "@/utils/track";
import { QUESTFLOW_APP_ID, QUESTFLOW_APP_NAME } from "@/lib/quest-contract";

const statusClasses = {
  Hot: "bg-[#FF6B6B]/18 text-[#FF8E8E]",
  New: "bg-[#00C2FF]/18 text-[#7AD9FF]",
  Reward: "bg-[#22E6A8]/18 text-[#6EF2C3]",
  Social: "bg-[#FBC531]/18 text-[#FFD86C]"
};

export function DiscoverPage() {
  const { address } = useAccount();

  // 追踪页面浏览
  useEffect(() => {
    trackEvent(QUESTFLOW_APP_ID, QUESTFLOW_APP_NAME, address, 'page_view', {
      page: 'discover'
    });
  }, [address]);

  return (
    <div className="space-y-5 pb-10 pt-6">
      <section className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="glass-panel gradient-stroke overflow-hidden rounded-[30px] p-6">
          <div className="flex items-center gap-2 text-sm text-accent">
            <Sparkles className="h-4 w-4" />
            Incentive + Social Discovery
          </div>
          <div className="mt-5 max-w-xl">
            <h2 className="text-4xl font-semibold leading-tight sm:text-5xl">
              Hunt local onchain quests and unlock instant Base rewards.
            </h2>
            <p className="mt-4 max-w-md text-sm leading-6 text-white/62">
              Publish sharp missions, join live challenges, and turn activity into claimable incentives.
            </p>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/publish"
              className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#0b1020] shadow-pill transition hover:scale-[1.02]"
            >
              Publish Quest
            </Link>
            <Link
              href="/quests/1"
              className="rounded-full border border-white/12 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Explore Live
            </Link>
          </div>
        </div>

        <div className="glass-panel gradient-stroke rounded-[30px] p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm text-white/60">Signal Pulse</p>
            <Flame className="h-4 w-4 text-success" />
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3">
            {stats.map((stat) => (
              <div key={stat.label} className="rounded-[24px] border border-white/8 bg-white/5 p-4">
                <p className="text-xs uppercase tracking-[0.24em] text-white/40">{stat.label}</p>
                <p className="mt-3 text-2xl font-semibold">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="hide-scrollbar flex gap-2 overflow-x-auto pb-1">
        {filters.map((filter, index) => (
          <button
            key={filter}
            className={`rounded-full px-4 py-2 text-sm transition ${
              index === 0
                ? "bg-white text-[#0b1020]"
                : "border border-white/10 bg-white/5 text-white/70 hover:bg-white/10"
            }`}
          >
            {filter}
          </button>
        ))}
      </section>

      <section className="glass-panel gradient-stroke hide-scrollbar overflow-x-auto rounded-[28px] px-4 py-3">
        <div className="flex min-w-max items-center gap-4">
          {socialFeed.map((item, index) => (
            <div key={item} className="flex items-center gap-3">
              <span className="rounded-full bg-white/10 px-3 py-2 text-sm text-white/85">{item}</span>
              {index < socialFeed.length - 1 ? <span className="text-white/30">•</span> : null}
            </div>
          ))}
        </div>
      </section>

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {quests.map((quest) => (
          <article
            key={quest.id}
            className="glass-panel gradient-stroke group relative overflow-hidden rounded-[30px] p-5 transition hover:-translate-y-1"
          >
            <div className="absolute -right-8 top-0 h-28 w-28 rounded-full bg-primary/20 blur-3xl" />
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className={`rounded-full px-3 py-1 text-xs ${statusClasses[quest.status]}`}>
                  {quest.status}
                </span>
                <h3 className="mt-4 text-2xl font-semibold">{quest.title}</h3>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-right">
                <p className="text-xs text-white/45">Reward</p>
                <p className="text-lg font-semibold text-success">{quest.reward}</p>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3 text-sm text-white/70">
              <div className="rounded-[22px] border border-white/8 bg-black/10 p-3">
                <div className="flex items-center gap-2">
                  <Users2 className="h-4 w-4 text-accent" />
                  <span>{quest.people}/{quest.maxPeople}</span>
                </div>
              </div>
              <div className="rounded-[22px] border border-white/8 bg-black/10 p-3">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span>{quest.timeLeft} left</span>
                </div>
              </div>
            </div>

            <div className="mt-5 flex items-center justify-between">
              <p className="text-sm text-white/45">{quest.category}</p>
              <Link
                href={`/quests/${quest.id}`}
                className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#0b1020] transition group-hover:scale-[1.03]"
              >
                Join
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
