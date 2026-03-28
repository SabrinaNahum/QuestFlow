"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ArrowUpRight, Gem, ShieldCheck, Trophy, Wallet } from "lucide-react";
import { useAccount } from "wagmi";

import { trackEvent } from "@/utils/track";
import { QUESTFLOW_APP_ID, QUESTFLOW_APP_NAME } from "@/lib/quest-contract";

const tiles = [
  { label: "Total Rewards", value: "1.92 ETH", icon: Gem },
  { label: "Completed", value: "46", icon: Trophy },
  { label: "Reputation", value: "96", icon: ShieldCheck }
];

const sections = [
  { href: "/quests/1", title: "My Quests", note: "12 live missions" },
  { href: "/quests/2", title: "Joined", note: "8 active joins" },
  { href: "/quests/3", title: "Rewards", note: "Claim history" }
];

export function ProfilePage() {
  const { address } = useAccount();

  // 追踪页面浏览
  useEffect(() => {
    trackEvent(QUESTFLOW_APP_ID, QUESTFLOW_APP_NAME, address, 'page_view', {
      page: 'profile'
    });
  }, [address]);

  return (
    <div className="space-y-4 pb-10 pt-6">
      <section className="glass-panel gradient-stroke rounded-[32px] p-5">
        <div className="flex items-center gap-4">
          <div className="flex h-20 w-20 items-center justify-center rounded-[28px] bg-gradient-to-br from-primary via-accent to-success text-2xl font-semibold text-white">
            Q
          </div>
          <div>
            <p className="text-sm text-white/50">Hunter Profile</p>
            <h2 className="mt-1 text-3xl font-semibold">0x90...b4f2</h2>
            <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/70">
              <Wallet className="h-4 w-4 text-accent" />
              Base Mainnet
            </div>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {tiles.map(({ label, value, icon: Icon }) => (
          <article key={label} className="glass-panel gradient-stroke rounded-[28px] p-4">
            <Icon className="h-5 w-5 text-success" />
            <p className="mt-4 text-xs uppercase tracking-[0.24em] text-white/40">{label}</p>
            <p className="mt-2 text-2xl font-semibold">{value}</p>
          </article>
        ))}
      </section>

      <section className="space-y-3">
        {sections.map((section) => (
          <Link
            key={section.title}
            href={section.href}
            className="glass-panel gradient-stroke flex items-center justify-between rounded-[28px] p-5 transition hover:-translate-y-1"
          >
            <div>
              <p className="text-xl font-semibold">{section.title}</p>
              <p className="mt-1 text-sm text-white/50">{section.note}</p>
            </div>
            <ArrowUpRight className="h-5 w-5 text-white/70" />
          </Link>
        ))}
      </section>
    </div>
  );
}
