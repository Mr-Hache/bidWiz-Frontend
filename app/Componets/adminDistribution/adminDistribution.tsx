"use client";

import React from "react";
import ApexCharts from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { ChartOptions } from "../adminSales/adminSales";

interface ChartData {
  series: number[];
  options: ApexOptions;
}

export default function adminDistribution() {
  const subjectsData: ChartData = {
    series: [1, 25, 20, 10, 5, 4, 3, 2, 1, 1, 100, 30],
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
        text: "Subjects Distribution",
        align: "center",
      },
    },
  };

  const languagesData: ChartData = {
    series: [30, 20, 15, 10, 8, 500, 4, 300, 2],
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
        text: "Languages Distribution",
        align: "center",
      },
    },
  };

  const topSubjectsData: ChartData = {
    series: subjectsData.series
      .slice()
      .sort((a, b) => b - a)
      .slice(0, 5),
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
        .slice(0, 5)
        .map((item) => item.label),
    },
  };

  return (
    <div>
      <h1>Top Five Subjects </h1>
      <ApexCharts
        options={topSubjectsData.options}
        series={topSubjectsData.series}
        type="pie"
        width={400}
      />
      <h1>Top Five Languajes</h1>
      <ApexCharts
        options={topLanguagesData.options}
        series={topLanguagesData.series}
        type="pie"
        width={400}
      />
    </div>
  );
}
