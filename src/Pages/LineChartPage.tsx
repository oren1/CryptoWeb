import { LineChart } from "../Components/ChartComponents/LineChart";
import { useLocation } from "react-router";

const LineChartPage = () => {
  const location = useLocation();

  return (
    <div className="App">
      <div className="chart-page-container">
        <LineChart fsym={location.state.symbol}></LineChart>
      </div>
    </div>
  );
};

export default LineChartPage;
