import React, { useState, useEffect } from "react";
import "./App.css";
import { useQuery, useLazyQuery } from "@apollo/client";
import { queries } from "./queries";
import { Context } from "./Contexts";
import { CoinsList } from "./Components/CoinComponents/CoinList";
import { Coin } from "./Types";
import { LineChart } from "./Components/ChartComponents/LineChart";

function App() {
  const [selectedCoin, setSelectedCoin] = useState<Coin | null>(null);
  const totalPages = 10;
  const coinsPerPage = 20;
  const pageNumberLimit = 3; // number of pages to see every time
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPageLimit, setMaxPageLimit] = useState(3);
  const [minPageLimit, setMinPageLimit] = useState(1);

  const [getCoins, { loading, error, data }] = useLazyQuery(queries.GET_COINS);

  useEffect(() => {
    async function fetchData() {
      const result = await getCoins({
        variables: { page: currentPage - 1 },
      });
      let firstCoin = result.data.listCoins[0];
      setSelectedCoin(firstCoin);
    }
    fetchData();
  }, [currentPage, getCoins]);

  if (loading && currentPage === 1) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  // build page numbers list based on total number of pages
  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  const handlePageClick = (page: number) => {
    onPageChange(page);
  };
  const handleNextClick = () => {
    console.log("handleNextClick");
  };
  const handlePrevClick = () => {
    console.log("handlePrevClick");
  };

  const pageNumbers = pages.map((page) => {
    if (page <= maxPageLimit && page >= minPageLimit) {
      return (
        <li
          key={page}
          onClick={() => handlePageClick(page)}
          className={currentPage === page ? "active" : "page-button"}
        >
          {page}
        </li>
      );
    } else {
      return null;
    }
  });

  const onPageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };
  const onPrevClick = () => {
    if (currentPage > 1) {
      if ((currentPage - 1) % pageNumberLimit === 0) {
        setMaxPageLimit(maxPageLimit - pageNumberLimit);
        setMinPageLimit(minPageLimit - pageNumberLimit);
      }
      setCurrentPage(currentPage - 1);
    }
  };

  const onNextClick = () => {
    if (currentPage < totalPages) {
      if (currentPage + 1 > maxPageLimit) {
        setMaxPageLimit(maxPageLimit + pageNumberLimit);
        setMinPageLimit(minPageLimit + pageNumberLimit);
      }
      setCurrentPage(currentPage + 1);
    }
  };

  // page ellipses
  function pageIncrementEllipses() {
    if (pages.length > maxPageLimit) {
      return (
        <li className="dots" onClick={onNextClick}>
          ...
        </li>
      );
    }
    return null;
  }

  function pageDecremenEllipses() {
    if (minPageLimit > 1) {
      return (
        <li className="dots" onClick={onPrevClick}>
          ...
        </li>
      );
    }
    return null;
  }

  return (
    <Context.Provider
      value={{
        selectedCoin,
        setSelectedCoin,
        currentPage: currentPage - 1,
        coinsPerPage,
      }}
    >
      <div className="App">
        <header className="App-header">
          <div className="head">
            <LineChart fsym={selectedCoin?.symbol}></LineChart>
          </div>
          <div className="coin-list-container">
            {loading ? (
              <div className="coin-list-message-container">Loading...</div>
            ) : (
              <CoinsList coins={data?.listCoins} />
            )}
            <ul className="pager">
              <li className="side-button" onClick={onPrevClick}>
                Prev
              </li>
              {pageDecremenEllipses()}
              {pageNumbers}
              {pageIncrementEllipses()}
              <li className="side-button" onClick={onNextClick}>
                Next
              </li>
            </ul>
          </div>
        </header>
      </div>
    </Context.Provider>
  );
}

export default App;
