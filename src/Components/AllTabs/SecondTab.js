import React from "react";
import "./SecondTab.css";
import { Bar } from "react-chartjs-2";
import { CategoryScale } from "chart.js";
import Chart from "chart.js/auto";
Chart.register(CategoryScale);
const SecondTab = () => {
  // modify this data object after fetching from the database
  const data = {
    xlabels: ["TOC", "FA", "NA", "GT"],
    ylabels: [15, 20, 13, 17],
  };
  function renderBarChart(d) {
    return (
      <div>
        <Bar
          data={{
            // Name of the variables on x-axies for each bar
            labels: d.xlabels,
            datasets: [
              {
                // Label for bars
                label: "Attendance",
                // Data or value of your each variable
                data: d.ylabels,
                // Color of each bar
                backgroundColor: ["blue", "green", "red", "yellow"],
                // Border color of each bar
                borderColor: ["aqua", "green", "red", "yellow"],
                borderWidth: 0.5,
              },
            ],
          }}
          // Height of graph
          height={400}
          options={{
            maintainAspectRatio: false,
            scales: {
              y: {
                Max: 44,
              },
              y: [
                {
                  ticks: {
                    // The y-axis value will start from zero
                    beginAtZero: true,
                  },
                },
              ],
            },
            legend: {
              labels: {
                fontSize: 15,
              },
            },
          }}
        />
      </div>
    );
  }
  return <div className="SecondTab">{renderBarChart(data)}</div>;
};
export default SecondTab;
