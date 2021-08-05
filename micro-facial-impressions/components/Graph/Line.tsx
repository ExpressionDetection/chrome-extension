import { Chart, Line } from "react-chartjs-2";
import { Label } from "../system/theme/colors";

function randomIntFromInterval(min = 0, max = 100) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const dataFixed = {
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
  plugins: {
    tooltip: {
      callbacks: {
        label: (context: any) => {
          let label = context.formattedValue || '';
          label += "%"
          return label
        }
      }
    },
    legend: {
      labels: {
        boxWidth: 16,
        boxHeight: 1,
        generateLabels: function (chart: any) {
          const items = Chart.defaults.plugins.legend.labels.generateLabels(chart);
          for (const item of items) {
            item.borderRadius = 1;
          }
          return items;
        },
        font: {
          family: "Quicksand",
          weight: 400
        }
      }
    },
  },
  scales: {
    y: {
      ticks: {
        callback: function (value: string, index, values) {
          return `${value}%`;
        },
      },
      grid: {
        display: false,
      },
    },
  },
};

const LineGraph: React.FC<{ datasets: any }> = ({ datasets }) => {
  dataFixed.labels = datasets[0]?.data.map((_: Label, index: number) => index)
  dataFixed.datasets = datasets;
  return <Line data={dataFixed} options={options} />;
};
export default LineGraph;
