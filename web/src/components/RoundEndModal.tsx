import { IconButton } from "./IconButton";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  result: {
    status: "win" | "lose";
    actualPrice: number;
    guessesCount: number;
  } | null;
  stats: {
    roundsPlayed: number;
    wins: number;
    bestStreak: number;
    totalGuessesToWin: number;
    guessDistribution: number[];
  };
  onNext: () => void;
};

type StatProps = {
  label: string;
  value: string | number;
};

export function RoundEndModal({ isOpen, onClose, result, stats, onNext }: Props) {
  if (!isOpen || !result) return null;

  const isWin = result.status === "win";

  const winRate = stats.roundsPlayed > 0 ? Math.round((stats.wins / stats.roundsPlayed) * 100) : 0;

  const avgGuesses = stats.wins > 0 ? Math.ceil(stats.totalGuessesToWin / stats.wins) : 0;

  return (
    <div onClick={onClose} className="z-[100] flex px-4 bg-black/35 fixed inset-0 items-center justify-center">
      <div
        onClick={(e) => e.stopPropagation()}
        className="
          w-full max-w-[440px]
          px-5 py-6
          bg-white
          border border-[var(--border)] rounded-[8px]
          relative
          sm:px-6 sm:py-7
        "
      >
        {/* Close */}
        <div className="absolute top-3 right-3">
          <IconButton content="X" onClick={onClose} />
        </div>

        {/* Title */}
        <div
          className={`
            mb-2
            text-center text-[20px] font-bold
            ${isWin ? "text-[var(--green)]" : "text-[var(--red)]"}
          `}
        >
          {isWin ? "Correct!" : "Round Over"}
        </div>

        {/* Subtitle */}
        <div className="mb-4 text-center text-[13px] text-[var(--muted)]">
          {isWin
            ? `Solved in ${result.guessesCount} guess${result.guessesCount > 1 ? "es" : ""}`
            : "You have used up all attempts"}
        </div>

        {/* Price */}
        <div
          className="
            p-4 mb-5
            text-center
            bg-[var(--hover)]
            border border-[var(--border)] rounded-[6px]
          "
        >
          <div className="mb-1 text-[11px] text-[var(--muted)] uppercase">Actual Price</div>
          <div className="text-[26px] font-bold">${result.actualPrice.toFixed(2)}</div>
        </div>

        {/* Stats */}
        {!isWin && (
          <div className="grid grid-cols-2 mb-5 gap-2">
            <Stat label="Played" value={stats.roundsPlayed} />
            <Stat label="Win Rate" value={`${winRate}%`} />
            <Stat label="Avg Guesses" value={avgGuesses || "—"} />
            <Stat label="Best Streak" value={stats.bestStreak} />
          </div>
        )}

        {/* Action */}
        <button
          onClick={onNext}
          className="
            w-full h-[44px]
            text-white font-bold
            bg-[var(--blue)]
            rounded-[6px]
            hover:opacity-85 transition
            cursor-pointer
          "
        >
          {isWin ? "Next Item" : "Retry"}
        </button>
      </div>
    </div>
  );
}

function Stat({ label, value }: StatProps) {
  return (
    <div className="p-3 text-center border border-[var(--border)] rounded-[6px]">
      <div className="text-[18px] font-bold">{value}</div>
      <div className="text-[10px] text-[var(--muted)] uppercase">{label}</div>
    </div>
  );
}
