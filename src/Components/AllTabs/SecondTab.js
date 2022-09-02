import React, { useState } from "react";
import "./SecondTab.css";
import { Bar } from "react-chartjs-2";
import { CategoryScale } from "chart.js";
import Chart from "chart.js/auto";
Chart.register(CategoryScale);
fetch(
  "https://iitgtt2022.000webhostapp.com/getatd.php?id=" +
    sessionStorage.getItem("id"),
  {
    credentials: "include",
    headers: {
      "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
    },
    method: "GET",
  }
)
  .then(function (response) {
    console.log("Aagaya data bhai Hurray!!");
    response.json().then((res) => {
      window.data = res;
      // data = res;
      // console.log(data);
    });
  })
  .catch(function (error) {
    console.log(error);
  });
const SecondTab = () => {
  // modify this data object after fetching from the database
  // const data = {
  //   xlabels: ["TOC", "FA", "NA", "GT"],
  //   ylabels: [15, 20, 13, 17],
  // };
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
                backgroundColor: ["blue", "green", "aqua", "yellow"],
                // Border color of each bar
                borderColor: ["aqua", "green", "aqua", "yellow"],
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
                max: 52,
                beginAtZero: true,
                // ticks: {
                //   // The y-axis value will start from zero

                //   steps: 10,
                //   stepValue: 5,
                //   max: 100,
                // },
              },
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
  return <div className="SecondTab">{renderBarChart(window.data)}</div>;
};
export default SecondTab;
