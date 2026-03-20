import { IconButton } from "./IconButton";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  stats: {
    roundsPlayed: number;
    wins: number;
    bestStreak: number;
    totalGuessesToWin: number;
    guessDistribution: number[];
  };
};

export function GameStatsModal({ isOpen, onClose, stats }: Props) {
  if (!isOpen) return null;

  const winRate =
    stats.roundsPlayed > 0
      ? Math.round((stats.wins / stats.roundsPlayed) * 100)
      : 0;

  const avgGuesses =
    stats.wins > 0 ? Math.ceil(stats.totalGuessesToWin / stats.wins) : 0;

  const maxVal = Math.max(...stats.guessDistribution, 1);

  return (
    <div
      onClick={onClose}
      className="z-[100] flex px-4 bg-black/35 fixed inset-0 items-center justify-center"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="
          overflow-y-auto
          w-full max-w-[440px] max-h-[90vh]
          px-5 py-6
          bg-white
          border border-[var(--border)] rounded-[8px]
          relative
          sm:px-6 sm:py-7
        "
      >
        {/* Close */}
        <div className="absolute top-3 right-3">
          <IconButton content="✕" onClick={onClose} />
        </div>

        {/* Title */}
        <div className="mb-5 text-[18px] font-bold">Statistics</div>

        {/* Metrics */}
        <div className="grid grid-cols-2 mb-5 gap-2 sm:grid-cols-4">
          <Stat label="Played" value={stats.roundsPlayed} />
          <Stat label="Win Rate" value={`${winRate}%`} />
          <Stat label="Avg Guesses" value={avgGuesses || "—"} />
          <Stat label="Best Streak" value={stats.bestStreak} />
        </div>

        {/* Distribution */}
        <div className="mb-2 text-[12px] font-bold text-[var(--muted)] tracking-wide uppercase">
          Guess Distribution
        </div>

        <div className="space-y-2">
          {["1", "2", "3", "4", "5", "6", "X"].map((label, i) => {
            const count = stats.guessDistribution[i];
            const width = count > 0 ? Math.max((count / maxVal) * 100, 8) : 0;

            return (
              <div key={i} className="flex items-center gap-2">
                <div className="w-4 text-center text-sm">{label}</div>

                <div className="flex-1 overflow-hidden h-[24px] bg-[var(--hover)] rounded-[4px]">
                  <div
                    style={{ width: `${width}%` }}
                    className={`
                      flex
                      h-full
                      pr-2
                      text-white text-[11px] font-bold
                      transition-all
                      items-center justify-end
                      ${i === 6 ? "bg-[var(--red)]" : "bg-[var(--blue)]"}
                    `}
                  >
                    {count || ""}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="p-3 text-center border border-[var(--border)] rounded-[6px]">
      <div className="text-[20px] font-bold">{value}</div>
      <div className="text-[10px] text-[var(--muted)] uppercase">{label}</div>
    </div>
  );
}
