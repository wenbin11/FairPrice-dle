import { useState } from "react";
import { useGame } from "./hooks/useGame";
import { Header } from "./sections/Header";
import { ItemInfoContainer } from "./sections/ItemInfoContainer";
import { GuessGrid } from "./sections/GuessGrid";
import { GuessInputRow } from "./sections/GuessInputRow";
import { RoundEndModal } from "./components/RoundEndModal";

function App() {
  const game = useGame();
  const [input, setInput] = useState("");

  const hasWon = game.guesses.some((g) => g.result === "close");
  const hasLost = game.isGameOver && !hasWon;

  function handleSubmit() {
    if (hasWon || hasLost) {
      game.nextRound();
      return;
    }

    const value = parseFloat(input);
    if (isNaN(value) || value <= 0) return;

    game.handleNextGuess(value);
    setInput("");
  }

  return (
    <>
      <Header stats={game.stats} />
      <ItemInfoContainer item={game.currentItem} />
      <GuessGrid guesses={game.guesses} />

      <GuessInputRow
        value={input}
        onChange={setInput}
        onSubmit={handleSubmit}
        disabled={!hasWon && !hasLost && game.isGameOver}
        buttonText={hasWon ? "NEXT" : hasLost ? "RETRY" : "GUESS"}
      />

      <RoundEndModal
        isOpen={!!game.roundResult}
        onClose={game.clearRoundResult}
        result={game.roundResult}
        stats={game.stats}
        onNext={game.nextRound}
      />
    </>
  );
}

export default App;
