import { useState } from "react";
import { useGame } from "./hooks/useGame";
import { Header } from "./sections/Header";
import { ItemInfoContainer } from "./sections/ItemInfoContainer";
import { GuessGrid } from "./sections/GuessGrid";
import { GuessInputRow } from "./sections/GuessInputRow";

function App() {
  const game = useGame();
  const [input, setInput] = useState("");

  function handleSubmit() {
    const value = parseFloat(input);

    if (isNaN(value) || value <= 0) {
      return;
    }

    game.handleNextGuess(value);
    setInput("");
  }

  return (
    <>
      <Header />
      <ItemInfoContainer item={game.currentItem} />
      <GuessGrid guesses={game.guesses} />
      <GuessInputRow value={input} onChange={setInput} onSubmit={handleSubmit} disabled={game.isGameOver} />
    </>
  );
}

export default App;
