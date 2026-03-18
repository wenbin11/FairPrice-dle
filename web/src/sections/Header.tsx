import { IconButton } from "../components/IconButton";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";

export function Header() {
  return (
    <div className="w-full border-b border-[var(--border)]">
      <header className="flex max-w-[640px] mx-auto px-3 py-3 items-center justify-between">
        <IconButton content="?" />

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
        />
      </header>
    </div>
  );
}
