import { Coin } from "../../Types";
import { CoinView } from "./CoinView";

export type CoinListProps = {
  coins?: Coin[];
};

export function CoinsList({ coins }: CoinListProps) {
  return (
    <>
      <ul className="coinList">
        <li>
          <h2>Top List</h2>
        </li>
        {coins?.map((coin, index) => (
          <CoinView
            index={index}
            coin={coin}
          ></CoinView>
        ))}
      </ul>
    </>
  );
}
