"use client";

import React from "react";
import ApexCharts from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import styles from "./adminSales.module.scss";

export interface ChartOptions extends ApexOptions {
  chart: {
    height?: number;
    type?:
      | "line"
      | "area"
      | "bar"
      | "pie"
      | "donut"
      | "radialBar"
      | "scatter"
      | "bubble"
      | "heatmap"
      | "candlestick"
      | "boxPlot"
      | "radar"
      | "polarArea"
      | "rangeBar"
      | "rangeArea"
      | "treemap";
    zoom?: {
      enabled: boolean;
    };
  };
  dataLabels?: {
    enabled: boolean;
  };
  stroke?: {
    curve?: "straight" | "smooth" | "stepline";
    show?: boolean;
    width?: number;
    colors?: string[];
  };
  title?: {
    text?: string;
    align?: "left" | "center" | "right" | undefined;
  };
  grid?: {
    row?: {
      colors?: string[];
      opacity?: number;
    };
  };
  xaxis?: {
    categories?: string[];
  };
}

export default function adminSales() {
  const options: ChartOptions = {
    chart: {
      height: 350,
      type: "line",
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "straight",
    },
    title: {
      text: "Product Trends by Month",
      align: "left",
    },
    grid: {
      row: {
        colors: ["#f3f3f3", "transparent"],
        opacity: 0.5,
      },
    },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
      ],
    },
  };

  const series = [
    {
      name: "ventas",
      data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
    },
    {
      name: "ventas",
      data: [10, 4, 355, 49, 6, 6, 91, 148],
    },
  ];

  return (
    <div className={styles.sales}>
      <h1>Sales</h1>
      <ApexCharts options={options} series={series} width={900} height={500} />
    </div>
  );
}
