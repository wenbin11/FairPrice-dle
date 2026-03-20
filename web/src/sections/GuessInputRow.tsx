type Props = {
  value: string;
  onChange: (v: string) => void;
  onSubmit: () => void;
  disabled?: boolean;
  buttonText: "NEXT" | "RETRY" | "GUESS";
};

export function GuessInputRow({ value, onChange, onSubmit, disabled = false, buttonText }: Props) {
  return (
    <div
      className="
        flex
        w-[92%] max-w-[500px]
        mx-auto mt-3 mb-5
        items-center gap-2
        md:w-full
      "
    >
      <div
        className="
          flex items-center justify-center
          h-[40px]
          px-2 sm:px-3
          text-[11px] sm:text-[13px]
          text-[var(--muted)]
          bg-[var(--hover)]
          border border-[var(--border)]
          rounded-[6px]
          shrink-0
        "
      >
        SGD $
      </div>

      {/* Input */}
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && onSubmit()}
        disabled={disabled}
        min="0"
        step="0.01"
        placeholder="0.00"
        className="
          flex-1 min-w-0
          h-[40px]
          px-2 sm:px-3
          text-[14px] sm:text-[15px]
          font-medium
          text-[var(--text)]
          bg-white
          border border-[var(--border)]
          rounded-[6px]
          outline-none
          focus:border-[var(--blue)]
          disabled:bg-[var(--hover)]
          disabled:text-[var(--muted)]
          disabled:cursor-not-allowed
        "
      />

      {/* Button */}
      <button
        onClick={onSubmit}
        className="
          flex items-center justify-center
          h-[40px]
          px-2 sm:px-4
          text-[10px] sm:text-[12px]
          font-bold tracking-[0.5px]
          text-white
          bg-[var(--blue)]
          rounded-[6px]
          shrink-0
          transition
          hover:opacity-85
          cursor-pointer
        "
      >
        {buttonText}
      </button>
    </div>
  );
}
