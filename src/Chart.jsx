import React from "react";
import { render } from "react-dom";
// Import Highcharts
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";

export default function Chart({ data }) {
 
  const options = {
    chart: {
      zoomType: "x",
      width: 1000,
    },
    credits: {
      enabled: false,
    },

    xAxis: {
      type: "datetime",
    },
    yAxis: {
      title: {
        text: "BP Measures",
      },
    },
    title: {
      text: "",
      enabled: false,
    },
    legend: {
      enabled: false,
    },
    plotOptions: {
      area: {
        fillColor: {
          linearGradient: {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
          },
          stops: [
            [0, Highcharts.getOptions().colors[0]],
            [
              1,
              Highcharts.color(Highcharts.getOptions().colors[0])
                .setOpacity(0)
                .get("rgba"),
            ],
          ],
        },
        marker: {
          radius: 2,
        },
        lineWidth: 1,
        states: {
          hover: {
            lineWidth: 1,
          },
        },
        threshold: null,
      },
    },

    series: [
      {
        type: "area",
        name: "LowBP",
        color: 'blue',
        data: data.map((item) => ({
          x: Date.UTC(
            new Date(item.timestamp).getFullYear(),
            new Date(item.timestamp).getMonth(),
            new Date(item.timestamp).getDate(),
            new Date(item.timestamp).getHours(),
            new Date(item.timestamp).getMinutes(),
            new Date(item.timestamp).getSeconds(),
          ),
          y: item.lowBP,
        })),
      },
      {
        type: "area",
        name: "HighBP",
        color: 'black',
        data: data.map((item) => ({
          x: Date.UTC(
            new Date(item.timestamp).getFullYear(),
            new Date(item.timestamp).getMonth(),
            new Date(item.timestamp).getDate(),
            new Date(item.timestamp).getHours(),
            new Date(item.timestamp).getMinutes(),
            new Date(item.timestamp).getSeconds(),
          ),
          y: item.highBP,
        })),
      },
    ],
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
}
