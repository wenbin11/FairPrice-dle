import { useState } from "react";
import { IconButton } from "../components/IconButton";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import { HowToPlayModal } from "../components/HowToPlayModal";
import { GameStatsModal } from "../components/GameStatsModal";

type GameStats = {
  roundsPlayed: number;
  wins: number;
  currentStreak: number;
  bestStreak: number;
  totalGuessesToWin: number;
  guessDistribution: number[];
};

type Props = {
  stats: GameStats;
};

export function Header({ stats }: Props) {
  const [showHow, setShowHow] = useState(false);
  const [openStats, setOpenStats] = useState(false);

  return (
    <>
      <div className="w-full border-b border-[var(--border)]">
        <header className="flex max-w-[640px] mx-auto px-3 py-3 items-center justify-between">
          <IconButton content="?" onClick={() => setShowHow(true)} />

          <div
            style={{ fontFamily: "Montserrat, sans-serif" }}
            className="
            flex-1
            min-w-0
            text-center text-base font-black tracking-tight whitespace-nowrap
            sm:text-xl sm:tracking-wide
            md:text-4xl
          "
          >
            <span className="text-[var(--blue)]">FAIRPRICE</span>
            <span className="text-[var(--red)]">DLE</span>
          </div>

          <IconButton
            content={<LeaderboardIcon className="h-4 w-4 sm:h-5 sm:w-5" />}
            onClick={() => setOpenStats(true)}
          />
        </header>
      </div>
      <HowToPlayModal isOpen={showHow} onClose={() => setShowHow(false)} />
      <GameStatsModal isOpen={openStats} onClose={() => setOpenStats(false)} stats={stats} />
    </>
  );
}
