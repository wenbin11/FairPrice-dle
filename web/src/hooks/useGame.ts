import { useState } from "react";
import { items } from "../assets/items";

type Item = (typeof items)[number];

type GuessResult = {
  value: number;
  result: "high" | "low" | "close";
};

type GameStats = {
  roundsPlayed: number;
  wins: number;
  currentStreak: number;
  bestStreak: number;
  totalGuessesToWin: number;
  guessDistribution: number[];
};

type RoundResult = {
  status: "win" | "lose";
  actualPrice: number;
  guessesCount: number;
};

export function useGame() {
  const [usedIds, setUsedIds] = useState<Set<string>>(new Set());
  const [guesses, setGuesses] = useState<GuessResult[]>([]);
  const [currentItem, setCurrentItem] = useState<Item | null>(() => {
    return items[Math.floor(Math.random() * items.length)];
  });
  const [roundResult, setRoundResult] = useState<RoundResult | null>(null);

  const [stats, setStats] = useState<GameStats>({
    roundsPlayed: 0,
    wins: 0,
    currentStreak: 0,
    bestStreak: 0,
    totalGuessesToWin: 0,
    guessDistribution: [0, 0, 0, 0, 0, 0, 0],
  });

  const MAX_GUESSES = 6;

  function getNextItem(exclude: Set<string>) {
    const available = items.filter((item) => !exclude.has(item.name));

    // pick a random item if all items have been used before
    if (available.length === 0) {
      return items[Math.floor(Math.random() * items.length)];
    }

    return available[Math.floor(Math.random() * available.length)];
  }

  function nextRound() {
    if (!currentItem) {
      return;
    }

    const newUsed = new Set(usedIds);
    newUsed.add(currentItem.name);

    const nextItem = getNextItem(newUsed);

    setUsedIds(newUsed);
    setCurrentItem(nextItem);
    setGuesses([]);
    setRoundResult(null);
  }

  function endRound(won: boolean, guessesCount: number) {
    if (!currentItem) return;

    setRoundResult({
      status: won ? "win" : "lose",
      actualPrice: currentItem.price,
      guessesCount,
    });

    setStats((prev) => {
      const next = { ...prev };
      next.roundsPlayed += 1;

      const dist = [...next.guessDistribution];

      if (won) {
        next.wins += 1;
        next.currentStreak += 1;
        next.bestStreak = Math.max(next.bestStreak, next.currentStreak);
        next.totalGuessesToWin += guessesCount;
        dist[guessesCount - 1] += 1;
      } else {
        next.currentStreak = 0;
        dist[6] += 1;
      }

      next.guessDistribution = dist;
      return next;
    });
  }

  function clearRoundResult() {
    setRoundResult(null);
  }

  function handleNextGuess(value: number) {
    if (!currentItem) {
      return;
    }

    const actual = currentItem.price;
    const percentageDiff = (Math.abs(value - actual) / actual) * 100;

    let result: GuessResult["result"];

    if (percentageDiff <= 5) {
      result = "close";
    } else if (actual < value) {
      result = "low";
    } else {
      result = "high";
    }

    setGuesses((prev) => {
      const updated = [...prev, { value, result }];

      const isWin = result === "close";
      const isLose = updated.length >= MAX_GUESSES && !isWin;

      if (isWin) endRound(true, updated.length);
      else if (isLose) endRound(false, updated.length);

      return updated;
    });
  }

  const isGameOver = guesses.length >= MAX_GUESSES || guesses.some((g) => g.result === "close");

  return {
    currentItem,
    guesses,
    handleNextGuess,
    nextRound,
    isGameOver,
    stats,
    roundResult,
    clearRoundResult,
  };
}
