import { createContext } from "react";
import { Coin } from "./Types";

export type CoinContext = {
    selectedCoin?: Coin | null;
    setSelectedCoin?: (coinId: Coin | null) => void;
    onCoinPressed?: (fromSymbol: string) => void;
    currentPage: number;
    coinsPerPage: number;
}

export const Context = createContext<CoinContext>({
    currentPage: 0,
    coinsPerPage: 20
});
