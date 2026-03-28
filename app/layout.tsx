import "./globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import type { ReactNode } from "react";

import { Providers } from "./providers";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>QuestFlow</title>
        <meta
          name="description"
          content="QuestFlow is a Base mini app for publishing, discovering, and completing incentivized onchain quests."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#0B1020" />
        <meta
          name="fc:miniapp"
          content={JSON.stringify({
            version: "next",
            imageUrl: "https://questflow-dusky.vercel.app/og/questflow-share.svg",
            button: {
              title: "Open QuestFlow",
              action: {
                type: "launch_miniapp",
                name: "QuestFlow",
                url: "https://questflow-dusky.vercel.app",
                splashImageUrl: "https://questflow-dusky.vercel.app/brand/questflow-splash.svg",
                splashBackgroundColor: "#0B1020"
              }
            }
          })}
        />
        <meta name="base:app_id" content="69c64c2d638fc70642e549d8" />
        <meta
          name="talentapp:project_verification"
          content="b9bb8895b384d305831bf4a82b88a2b60d1b1c065e664a468467646b753dcc15275c046d8c2b1a2bbf65b3ca39396a54e25a010bfb27bcb2dc8be4f32d0704b1"
        />
        <meta property="og:title" content="QuestFlow" />
        <meta property="og:description" content="链上任务发布与完成，参与即得奖励" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://questflow-dusky.vercel.app/og/questflow-share.svg" />
      </head>
      <body>
        <div className="app-bg" />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
