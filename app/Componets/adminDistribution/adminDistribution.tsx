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

      colors: ["#73bc49", "#8cd461", "#a5ed79"],
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

      colors: ["#71458e", "#83559f", "#9465b1"],
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
        .slice(0, 4)
        .map((item) => item.label),
    },
  };

  const topLanguagesData: ChartData = {
    series: languagesData.series
      .slice()
      .sort((a, b) => b - a)
      .slice(0, 4),
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
    <div>
      <h1>Top Three Subjects </h1>
      <ApexCharts
        options={topSubjectsData.options}
        series={topSubjectsData.series}
        type="pie"
        width={350}
      />
      <h1>Top Three Languajes</h1>
      <ApexCharts
        options={topLanguagesData.options}
        series={topLanguagesData.series}
        type="pie"
        width={350}
      />
    </div>
  );
}
