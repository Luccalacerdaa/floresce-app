"use client";

import { notFound, useParams } from "next/navigation";
import { CadeGame } from "@/components/games/CadeGame";
import { EscolhaGame } from "@/components/games/EscolhaGame";
import { GameShell } from "@/components/games/GameShell";
import { SomGame } from "@/components/games/SomGame";
import { SopraGame } from "@/components/games/SopraGame";
import { TrocaTool } from "@/components/games/TrocaTool";
import { gameBySlug } from "@/lib/games";
import { useMicLevel } from "@/lib/sound";

export default function GamePage() {
  const { slug } = useParams<{ slug: string }>();
  const game = gameBySlug(slug);
  const mic = useMicLevel();
  if (!game) notFound();

  return (
    <GameShell game={game} onStart={game.usesMic ? mic.start : undefined}>
      {({ name, celebrate, score }) => {
        const micOn = mic.status === "on";
        switch (game.slug) {
          case "cade":
            return <CadeGame celebrate={celebrate} score={score} />;
          case "som":
            return <SomGame level={mic.level} micOn={micOn} celebrate={celebrate} score={score} />;
          case "sopra":
            return <SopraGame level={mic.level} micOn={micOn} name={name} celebrate={celebrate} score={score} />;
          case "escolha":
            return <EscolhaGame celebrate={celebrate} score={score} />;
          case "troca":
            return <TrocaTool score={score} />;
        }
      }}
    </GameShell>
  );
}
