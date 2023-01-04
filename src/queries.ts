import { gql } from '@apollo/client';

export const queries = {
  GET_COINS: gql`
    query ListCoins($page: Int!) {
      listCoins(page: $page) {
        id
        symbol
        coinName
        imageUrl
      }
    }
  `,

  GET_HISTORY: gql`
    query GetHistory($params: HistoryParams) {
      listHistory(params: $params) {
        x
        y
      }
    }
  `,
};
