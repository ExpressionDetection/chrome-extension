import { Line } from "react-chartjs-2";

function randomIntFromInterval(min = 0, max = 100) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const data = {
  labels: ["1", "2", "3", "4", "5", "6"],
  datasets: [
    {
      label: "sad",
      data: [
        randomIntFromInterval(),
        randomIntFromInterval(),
        randomIntFromInterval(),
        randomIntFromInterval(),
        randomIntFromInterval(),
        randomIntFromInterval(),
      ],
      fill: false,
      backgroundColor: "#801CFF",
      borderColor: "#801CFF",
    },
    {
      label: "happy",
      data: [
        randomIntFromInterval(),
        randomIntFromInterval(),
        randomIntFromInterval(),
        randomIntFromInterval(),
        randomIntFromInterval(),
        randomIntFromInterval(),
      ],
      fill: false,
      backgroundColor: "#57BFFA",
      borderColor: "#57BFFA",
    },
    {
      label: "neutral",
      data: [
        randomIntFromInterval(),
        randomIntFromInterval(),
        randomIntFromInterval(),
        randomIntFromInterval(),
        randomIntFromInterval(),
        randomIntFromInterval(),
      ],
      fill: false,
      backgroundColor: "#1EE449",
      borderColor: "#1EE449",
    },
    {
      label: "disgusted",
      data: [
        randomIntFromInterval(),
        randomIntFromInterval(),
        randomIntFromInterval(),
        randomIntFromInterval(),
        randomIntFromInterval(),
        randomIntFromInterval(),
      ],
      fill: false,
      backgroundColor: "#FFBA33",
      borderColor: "#FFBA33",
    },
  ],
};

const options = {
  elements: {
    line: {
      tension: 0.15,
    },
    point: {
      radius: 2,
    },
  },
  scales: {
    y: {
      ticks: {
        callback: function(value, index, values) {
          return `${value}%`;
        },
      },
      grid: {
        display: false,
      },
    },
  },
};

const LineGraph = () => {
  return <Line data={data} options={options} />;
};
export default LineGraph;
