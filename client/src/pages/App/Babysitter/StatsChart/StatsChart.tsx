import { Pie } from "react-chartjs-2";
import { Chart, Tooltip, Legend, ArcElement } from "chart.js";

import styles from "./StatsChart.module.css";
import { StatsChartProps } from "./StatsChartProps";

Chart.register(Tooltip, Legend, ArcElement);

const StatsChart = ({ data }: StatsChartProps) => {
  const options = {
    responsive: true,
    maintainAspectRatio: true,
  };

  const pieChartData = {
    labels: ["Contacted", "Worked With", "Rest"],
    datasets: [
      {
        label: "Conversion Rate",
        data,
        backgroundColor: [
          "rgba(255,99,132,0.9)",
          "rgba(54,162,235,0.9)",
          "rgba(5,162,205,0.9)",
        ],
        hoverOffset: 4,
      },
    ],
  };

  return (
    <>
      {data.length && (
        <div className={styles.chartContainer}>
          <Pie options={options} data={pieChartData} />
        </div>
      )}
    </>
  );
};

export default StatsChart;
