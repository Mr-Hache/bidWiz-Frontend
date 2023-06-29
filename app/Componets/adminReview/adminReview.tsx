"use client";

import React, { useEffect, useState } from "react";
import ApexCharts from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import styles from "./adminReview.module.scss";

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

    xaxis: {
      categories: chartData.map((user) => user.name),
    },
    tooltip: {
      custom: function ({ seriesIndex, dataPointIndex, w }) {
        const user = chartData[dataPointIndex];
        return `<div class="custom-tooltip"><img src="${user.image}" alt="${user.name}" style="display: block; margin: 0 auto;" width="70" height="70" /><h4>${user.name}</h4></div>`;
      },
    },
    colors: ["#5e35b1"],
    plotOptions: {
      bar: {
        horizontal: false,
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "light",
        type: "vertical",
        shadeIntensity: 0.5,
        gradientToColors: ["#b39ddb"],
        inverseColors: false,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100],
      },
    },
  };

  const series = [
    {
      data: chartData.map((user) => parseFloat(user.reviews.$numberDecimal)),
    },
  ];

  return (
    <div className={styles.reviews}>
      <h1>Top Reviews</h1>
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
