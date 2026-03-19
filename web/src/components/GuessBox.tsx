import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import CheckIcon from "@mui/icons-material/Check";

type GuessStatus = "close" | "high" | "low";

type Props = {
  value?: number;
  result?: GuessStatus;
};

function getHint(result?: GuessStatus) {
  const base = "flex items-center gap-1";

  if (result === "high") {
    return (
      <div className={base}>
        <ArrowUpwardIcon fontSize="small" />
        <span>Higher</span>
      </div>
    );
  } else if (result === "low") {
    return (
      <div className={base}>
        <ArrowDownwardIcon fontSize="small" />
        <span>Lower</span>
      </div>
    );
  } else {
    return (
      <div className={base}>
        <CheckIcon fontSize="small" />
        <span>Correct</span>
      </div>
    );
  }
}

export function GuessBox({ value, result }: Props) {
  const baseStyles = `
    w-full h-[40px]
    flex items-center justify-between
    px-3 sm:px-4
    rounded-[6px]
    border
    text-[14px] sm:text-[15px]
    font-medium
    transition
  `;

  const stateStyles = {
    close: "bg-[var(--green)] border-[var(--green)] text-white",
    high: "bg-[var(--red)] border-[var(--red)] text-white",
    low: "bg-[var(--orange)] border-[var(--orange)] text-white",
  };

  const emptyStyles = "bg-[#fafafa] border-[var(--border)] text-[var(--text)]";

  return (
    <div className={`${baseStyles} ${result ? stateStyles[result] : emptyStyles}`}>
      {value !== undefined ? (
        <>
          <span className="font-bold">${value.toFixed(2)}</span>
          <span className="text-[11px] sm:text-[12px] opacity-90">{getHint(result)}</span>
        </>
      ) : null}
    </div>
  );
}
