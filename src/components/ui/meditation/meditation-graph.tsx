"use client";
import { Meditation } from "@prisma/client";
import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { formatDateToLocal } from "@/lib/utils";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

type PropsType = {
  meditations: Meditation[];
};

const options = {
  responsive: true,
  animation: {
    duration: 2000,
  },
  maintainAspectRatio: false,
  scales: {
    y: {
      title: {
        display: true,
        text: "Minutes",
      },
      min: 0,
      grid: {
        display: false,
      },
    },
    x: {
      title: {
        display: true,
        text: "Date",
      },
      grid: {
        display: false,
      },
    },
  },
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: true,
      text: "This month",
    },
    tooltip: {
      callbacks: {
        label: (context: any) => `${context.parsed.y} minutes`,
      },
    },
  },
};

export default function MeditationGraph({ meditations }: PropsType) {
  const labels = meditations.map((m) => formatDateToLocal(m.date));

  const data = {
    labels,
    datasets: [
      {
        label: "Line",
        data: meditations.map((m) => m.duration),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return (
    <div className="min-w-[80vw] min-h-[40vh] max-w-[90vw] md:max-w-[60vw] mx-auto mt-10">
      <Line className="mx" options={options} data={data} />
    </div>
  );
}
