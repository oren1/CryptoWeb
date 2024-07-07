import React, { useState, useEffect } from "react";
import "./App.css";
import { useQuery, useLazyQuery } from "@apollo/client";
import { queries } from "./queries";
import { Context } from "./Contexts";
import { CoinsList } from "./Components/CoinComponents/CoinList";
import { Coin } from "./Types";
import { LineChart } from "./Components/ChartComponents/LineChart";
import Main from "./CryptoWebsitePage";
import LineChartPage from "./Pages/LineChartPage";
import CryptoWebsitePage from "./CryptoWebsitePage";
import Home from "./Pages/Home";
import { Routes, Route } from "react-router-dom";
import video from "./CryptoApp.mp4";
import VideoPlayer from './VideoPlayer';


function App() {
  return (
    <Routes>
      <Route path="/" element={<CryptoWebsitePage />} />
      {/* <Route path="CryptoWebsitePage" element={<CryptoWebsitePage />} />
      <Route path="VideoPlayer" element={<VideoPlayer url={video} />} /> */}
      <Route path="chart" element={<LineChartPage />} />
    </Routes>
  );
}

export default App;
