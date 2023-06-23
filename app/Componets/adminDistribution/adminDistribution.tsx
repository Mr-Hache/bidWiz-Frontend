"use client";

import React from "react";
import ApexCharts from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { ChartOptions } from "../adminSales/adminSales";
import styles from "./adminDistribution.module.scss";

interface ChartData {
  series: number[];
  options: ApexOptions;
}

export default function adminDistribution() {
  const subjectsData: ChartData = {
    series: [1, 25, 20, 10, 5, 4, 3, 2, 1, 1, 1, 30],
    options: {
      labels: [
        "Mathematics",
        "Physics",
        "Chemistry",
        "Biology",
        "Economics",
        "Business Administration",
        "Accounting",
        "Computer Science",
        "Music Theory",
        "Political Science",
        "Law",
        "Programming",
      ],
      title: {
        text: "Subjects",
        align: "center",
      },
      colors: ["#73bc49", "#8cd461", "#a5ed79"],
      dataLabels: {
        style: {
          colors: ["#263238"], // Color negro para las letras
        },

        dropShadow: {
          enabled: false, // Desactivar las sombras
        },
      },
    },
  };

  const languagesData: ChartData = {
    series: [30, 20, 15, 10, 8, 50, 4, 30, 2],
    options: {
      labels: [
        "English",
        "Spanish",
        "Portuguese",
        "German",
        "French",
        "Chinese",
        "Japanese",
        "Russian",
        "Italian",
      ],
      title: {
        text: "Languages",
        align: "center",
      },
      colors: ["#71458e", "#83559f", "#9465b1", "#D989B5", "#FFADBC"],
      dataLabels: {
        style: {
          colors: ["#263238"], // Color negro para las letras
        },

        dropShadow: {
          enabled: false, // Desactivar las sombras
        },
      },
    },
  };

  const topSubjectsData: ChartData = {
    series: subjectsData.series
      .slice()
      .sort((a, b) => b - a)
      .slice(0, 4),
    options: {
      ...subjectsData.options,
      labels: subjectsData.options?.labels
        ?.map((label, index) => ({ label, value: subjectsData.series[index] }))
        .sort((a, b) => b.value - a.value)
        .slice(0, 5)
        .map((item) => item.label),
    },
  };

  const topLanguagesData: ChartData = {
    series: languagesData.series
      .slice()
      .sort((a, b) => b - a)
      .slice(0, 5),
    options: {
      ...languagesData.options,
      labels: languagesData.options?.labels
        ?.map((label, index) => ({ label, value: languagesData.series[index] }))
        .sort((a, b) => b.value - a.value)
        .slice(0, 4)
        .map((item) => item.label),
    },
  };

  return (
    <div className={styles.five}>
      <h1>Top Five</h1>
      <div className={styles.grafic}>
        <ApexCharts
          options={topSubjectsData.options}
          series={topSubjectsData.series}
          type="pie"
          width={300}
        />
      </div>
      <div className={styles.grafic}>
        <ApexCharts
          options={topLanguagesData.options}
          series={topLanguagesData.series}
          type="pie"
          width={300}
        />
      </div>
    </div>
  );
}
