import { useState } from "react";
import { items } from "../assets/items";

type Item = (typeof items)[number];

type GuessResult = {
  value: number;
  result: "high" | "low" | "close";
};

export function useGame() {
  const [usedIds, setUsedIds] = useState<Set<string>>(new Set());
  const [guesses, setGuesses] = useState<GuessResult[]>([]);
  const [currentItem, setCurrentItem] = useState<Item | null>(() => {
    return items[Math.floor(Math.random() * items.length)];
  });

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

    setGuesses((prev) => [...prev, { value, result }]);

    if (result === "close") {
      setTimeout(nextRound, 800);
    }
  }

  const MAX_GUESSES = 6;
  const isGameOver = guesses.length >= MAX_GUESSES || guesses.some((g) => g.result === "close");

  return {
    currentItem,
    guesses,
    handleNextGuess,
    nextRound,
    isGameOver,
  };
}
