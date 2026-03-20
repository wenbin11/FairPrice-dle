import { IconButton } from "../components/IconButton";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import CheckIcon from "@mui/icons-material/Check";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

function Step({ num, children }: { num: number; children: React.ReactNode }) {
  return (
    <div className="flex mb-4 items-start gap-3">
      <div
        className="
          flex
          w-6 h-6
          mt-[2px]
          text-white text-[12px] font-bold
          bg-[var(--blue)]
          rounded-full
          items-center justify-center shrink-0
        "
      >
        {num}
      </div>

      {/* Force proper left alignment */}
      <div className="text-[14px] text-[var(--text)] leading-relaxed text-left">
        {children}
      </div>
    </div>
  );
}

function Hint({
  type,
  children,
}: {
  type: "green" | "orange" | "red";
  children: React.ReactNode;
}) {
  const colors = {
    green: "bg-[var(--green)]",
    orange: "bg-[var(--orange)]",
    red: "bg-[var(--red)]",
  };

  return (
    <div
      className={`
        flex
        px-3 py-1
        text-[12px] font-medium text-white
        rounded-[4px]
        items-center gap-1 ${colors[type]}
      `}
    >
      {children}
    </div>
  );
}

export function HowToPlayModal({ isOpen, onClose }: Props) {
  if (!isOpen) return null;

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
          animate-[modalIn_0.2s_ease]
          relative
          sm:px-6 sm:py-7
        "
      >
        {/* Close */}
        <div className="absolute top-3 right-3">
          <IconButton content="✕" onClick={onClose} />
        </div>

        {/* Title */}
        <div className="mb-5 pr-6 text-[18px] font-bold text-[var(--text)]">
          How to Play
        </div>

        {/* Step 1 */}
        <Step num={1}>
          Guess the price of the item in <strong>6 tries</strong>.
        </Step>

        {/* Step 2 */}
        <Step num={2}>
          <div>
            Each guess gives you a hint:
            <div className="flex flex-col mt-3 gap-2 md:flex-row">
              <Hint type="green">
                <CheckIcon fontSize="small" />
                <span>Within 5% - You win!</span>
              </Hint>

              <Hint type="orange">
                <ArrowUpwardIcon fontSize="small" />
                <span>Higher</span>
              </Hint>

              <Hint type="red">
                <ArrowDownwardIcon fontSize="small" />
                <span>Lower</span>
              </Hint>
            </div>
          </div>
        </Step>

        <hr className="my-4 border-t border-[var(--border)]" />

        {/* Step 3 */}
        <Step num={3}>
          Win by getting within <strong>5%</strong> of the actual price.
        </Step>

        {/* Step 4 */}
        <Step num={4}>
          Prices reflect typical FairPrice supermarket values.
        </Step>
      </div>
    </div>
  );
}
