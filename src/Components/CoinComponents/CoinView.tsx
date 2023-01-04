import { Coin } from "../../Types";
import { useContext } from "react";
import { Context } from "../../Contexts";

type CoinViewProps = {
    index: number;
    coin: Coin;
}

export function CoinView({index, coin}: CoinViewProps) {
  const {id, coinName, imageUrl} = coin;
  const { selectedCoin, setSelectedCoin, currentPage, coinsPerPage } = useContext(Context);
  return (
    <li className="coin">
      <button
        className={selectedCoin?.id === id ? "coin-selected" : "coin"}
        onClick={() => {
          setSelectedCoin?.(coin);
        }}
      >
        <h4>{(currentPage * coinsPerPage) + index + 1}</h4>
        <img className="icon" src={imageUrl} alt="BigCo Inc. logo" />
        <h4>{`${coinName}`}</h4>
      </button>
    </li>
  );
}
