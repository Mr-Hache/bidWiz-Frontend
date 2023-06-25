"use client";

import React, { useEffect, useState } from "react";
import ApexCharts from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import styles from "./adminSales.module.scss";

interface User {
  _id: string;
  name: string;
  image: string;
  reviews: {
    $numberDecimal: string;
  };
}

export default function AdminSales() {
  const [chartData, setChartData] = useState<User[]>([]);

  useEffect(() => {
    fetch(
      "https://bidwiz-backend-production-db77.up.railway.app/users/top-wizards"
    )
      .then((response) => response.json())
      .then((data) => {
        setChartData(data);
      });
  }, []);

  const options: ApexOptions = {
    chart: {
      type: "bar",
      height: 350,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
      },
    },
    xaxis: {
      categories: chartData.map((user) => user._id),
    },
    tooltip: {
      custom: function ({ seriesIndex, dataPointIndex, w }) {
        const user = chartData[dataPointIndex];
        return `<div class="custom-tooltip"><img src="${user.image}" alt="${user.name}" width="50" height="50" /><p>${user.name}</p></div>`;
      },
    },
  };

  const series = [
    {
      data: chartData.map((user) => parseFloat(user.reviews.$numberDecimal)),
    },
  ];

  return (
    <div>
      <h1>Top 10 Reviews</h1>
      <ApexCharts
        options={options}
        series={series}
        type="bar"
        height={550}
        width={800}
      />
    </div>
  );
}
