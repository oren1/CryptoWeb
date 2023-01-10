import React, { useState, useEffect } from "react";
import "./App.css";
import { useQuery, useLazyQuery } from "@apollo/client";
import { queries } from "./queries";
import { Context } from "./Contexts";
import { CoinsList } from "./Components/CoinComponents/CoinList";
import { Coin } from "./Types";
import { LineChart } from "./Components/ChartComponents/LineChart";
import Main from "./Main";
import LineChartPage from "./Pages/LineChartPage";

import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="chart" element={<LineChartPage />} />
    </Routes>
  );
}

export default App;
