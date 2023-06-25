"use client";

import React from "react";
import ApexCharts from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import styles from "./adminDistribution.module.scss";
import { useEffect, useState } from "react";

interface ChartData {
  series: number[];
  options: ApexOptions;
}

export default function adminDistribution() {
  const [subjectsData, setSubjectsData] = useState<ChartData>({
    series: [],
    options: {
      labels: [],
      title: {
        text: "Subjects",
        align: "center",
      },
      colors: [],
      dataLabels: {
        style: {
          colors: ["#263238"], // Color negro para las letras
        },
      },
    },
  });

  const [languagesData, setLanguagesData] = useState<ChartData>({
    series: [],
    options: {
      labels: [],
      title: {
        text: "Languages",
        align: "center",
      },
      colors: [],
      dataLabels: {
        style: {
          colors: ["#263238"], // Color negro para las letras
        },
      },
    },
  });

  useEffect(() => {
    fetch(
      "https://bidwiz-backend-production-db77.up.railway.app/jobs/subject-stats"
    )
      .then((response) => response.json())
      .then((data) => {
        const series: number[] = data
          .map((item: { count: number }) => item.count)
          .slice(0, 3);
        const labels: string[] = data
          .map((item: { _id: string }) => item._id)
          .slice(0, 3);
        const colors = ["#b280b1", "#d8a6d8", "#ffccff"];

        const updatedSubjectsData: ChartData = {
          series: series,
          options: {
            labels: labels,
            title: {
              text: "Subjects",
              align: "center",
            },
            colors: colors,
            dataLabels: {
              style: {
                colors: ["#263238"],
              },
              dropShadow: {
                enabled: false,
              },
            },
          },
        };

        setSubjectsData(updatedSubjectsData);
      });
  }, []);

  useEffect(() => {
    fetch(
      "https://bidwiz-backend-production-db77.up.railway.app/jobs/language-stats"
    )
      .then((response) => response.json())
      .then((data) => {
        const series: number[] = data
          .map((item: { count: number }) => item.count)
          .slice(0, 3);
        const labels: string[] = data
          .map((item: { _id: string }) => item._id)
          .slice(0, 3);
        const colors = ["#8cbf7a", "#bfdfa9", "#f2ffd8"];

        const updatedLanguagesData: ChartData = {
          series: series,
          options: {
            labels: labels,
            title: {
              text: "Languages",
              align: "center",
            },
            colors: colors,
            dataLabels: {
              style: {
                colors: ["#263238"],
              },
              dropShadow: {
                enabled: false,
              },
            },
          },
        };

        setLanguagesData(updatedLanguagesData);
      });
  }, []);

  return (
    <div className={styles.five}>
      <h1>Top Three</h1>
      <div className={styles.grafic}>
        <ApexCharts
          options={subjectsData.options}
          series={subjectsData.series}
          type="pie"
          width={360}
        />
      </div>
      <div className={styles.grafic}>
        <ApexCharts
          options={languagesData.options}
          series={languagesData.series}
          type="pie"
          width={350}
        />
      </div>
    </div>
  );
}
