import "./App.css";
import LineChartPage from "./Pages/LineChartPage";
import CryptoWebsitePage from "./CryptoWebsitePage";
import { Routes, Route } from "react-router-dom";


function App() {
  return (
    <Routes>
      <Route path="/" element={<CryptoWebsitePage />} />
      <Route path="chart" element={<LineChartPage />} />
    </Routes>
  );
}

export default App;
