import { useGame } from "./hooks/useGame";
import { Header } from "./sections/Header";
import { ItemInfoContainer } from "./sections/ItemInfoContainer";

function App() {
  const game = useGame();
  return (
    <>
      <Header />
      <ItemInfoContainer item={game.currentItem} />
    </>
  );
}

export default App;
