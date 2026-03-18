type IconButtonProps = {
  content: React.ReactNode;
};

export function IconButton({ content }: IconButtonProps) {
  return (
    <button
      className="
        flex-shrink-0 flex
        w-8 h-8
        rounded-full border border-[var(--border)]
        cursor-pointer
        items-center justify-center hover:bg-[var(--hover)]
        sm:w-[32px] sm:h-[32px]
      "
    >
      <span
        className="
          flex
          text-sm leading-none
          items-center justify-center [&>svg]:w-4 [&>svg]:h-4
          sm:[&>svg]:w-5 sm:[&>svg]:h-5
        "
      >
        {content}
      </span>
    </button>
  );
}
