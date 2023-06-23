"use client";

import React from "react";
import ApexCharts from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { ChartOptions } from "../adminSales/adminSales";

export default function adminUsers() {
  const options: ChartOptions = {
    chart: {
      height: 350,
      type: "bar",
      zoom: {
        enabled: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
        borderRadius: 10,
      },
    },
    stroke: {
      show: false,
      width: 1,
      colors: ["transparent"],
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: ["Alumnos", "Wizards", "Total"],
    },
    labels: ["Alumnos", "Wizards", "Total"],
  };

  const series = [
    {
      data: [80, 35, 115],
    },
  ];

  return (
    <div>
      <h1>Users</h1>
      <ApexCharts
        options={options}
        series={series}
        type="bar"
        width={400}
        height={300}
      />
    </div>
  );
}
