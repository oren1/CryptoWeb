import React, { useState, useEffect } from "react";
import "./App.css";
import { useQuery, useLazyQuery } from "@apollo/client";
import { queries } from "./queries";
import { Context } from "./Contexts";
import { CoinsList } from "./Components/CoinComponents/CoinList";
import { Coin } from "./Types";
import { LineChart } from "./Components/ChartComponents/LineChart";
import { BrowserView, MobileView, isMobile } from "react-device-detect";
import { useNavigate } from 'react-router-dom';
import { ThreeDots } from "react-loader-spinner";

function CryptoWebsitePage() {
  const [selectedCoin, setSelectedCoin] = useState<Coin | null>(null);
  const totalPages = 10;
  const coinsPerPage = 20;
  const pageNumberLimit = 3; // number of pages to see every time
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPageLimit, setMaxPageLimit] = useState(3);
  const [minPageLimit, setMinPageLimit] = useState(1);
  const navigate = useNavigate();

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

  if (loading && currentPage === 1) 
  return  <div className="loading">
    <ThreeDots
  visible={true}
  height="80"
  width="80"
  color="orange"
  radius="9"
  ariaLabel="three-dots-loading"
  wrapperStyle={{}}
  wrapperClass=""
  />
  </div>;

  if (error) return <p>Error : {error.message}</p>;

  // build page numbers list based on total number of pages
  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  const pageNumbers = pages.map((page) => {
    if (page <= maxPageLimit && page >= minPageLimit) {
      return (
        <li
          key={page}
          onClick={() => onPageChange(page)}
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

  const onCoinPressed = (fromSymbol: string) => {
    if(isMobile) {
      navigate('/chart', { state: { symbol: fromSymbol}})
    }
  }

  const listView = (loding: boolean, mobile: boolean) => {
    return (
      <div
        className={
          mobile ? "mobile-coin-list-container" : "coin-list-container"
        }
      >
        {loading ? (
          <div className={"coin-list-message-container"}>Loading...</div>
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
    );
  };

  return (
    <Context.Provider
      value={{
        selectedCoin,
        setSelectedCoin,
        currentPage: currentPage - 1,
        coinsPerPage,
        onCoinPressed
      }}
    >
      <BrowserView className="App">
        <div className="chart-container">
          {
            !selectedCoin ? <div></div> : <LineChart fsym={selectedCoin?.symbol}></LineChart>
          }
        </div>
        {listView(loading, false)}
      </BrowserView>
      <MobileView className="App">{listView(loading, true)}</MobileView>
    </Context.Provider>
  );
}

export default CryptoWebsitePage;
