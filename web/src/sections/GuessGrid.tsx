import { GuessBox } from "../components/GuessBox";

type GuessStatus = "close" | "high" | "low";

type Guess = {
  value: number;
  result: GuessStatus;
};

type Props = {
  guesses: Guess[];
};

export function GuessGrid({ guesses }: Props) {
  return (
    <div className="flex flex-col w-[92%] max-w-[500px] mx-auto mt-5 gap-2 sm:px-0 md:w-full">
      {Array.from({ length: 6 }).map((_, i) => {
        const guess = guesses[i];

        return <GuessBox key={i} value={guess?.value} result={guess?.result} />;
      })}
    </div>
  );
}
