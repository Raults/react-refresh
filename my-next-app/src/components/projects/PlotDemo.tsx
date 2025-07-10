"use client";

import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    LineElement,
    LinearScale,
    PointElement,
    CategoryScale,
    Tooltip,
    Legend,
} from "chart.js";
import { useEffect, useRef, useState } from "react";

ChartJS.register(LineElement, LinearScale, PointElement, CategoryScale, Tooltip, Legend);

type Point = { x: number; y: number };

const generateInitialData = (): Point[] => {
    const startX = 100;
    const result: Point[] = [];
    for (let i = 0; i < 30; i++) {
        result.push({ x: startX + i, y: 60 + Math.sin(i / 3) * 2 });
    }
    return result;
};

const PlotDemo = () => {
    const [dataPointsA, setDataPointsA] = useState<Point[]>(generateInitialData);
    const [dataPointsB, setDataPointsB] = useState<Point[]>(generateInitialData);
    const [dataPointsC, setDataPointsC] = useState<Point[]>(generateInitialData);

    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        intervalRef.current = setInterval(() => {
            setDataPointsA((prev) => {
                const last = prev[prev.length - 1];
                const nextY = Math.max(50, Math.min(75, last.y + (Math.random() - 0.5) * 0.6));
                const nextX = last.x + 1;
                return [...prev.slice(1), { x: nextX, y: parseFloat(nextY.toFixed(1)) }];
            });

            setDataPointsB((prev) => {
                const last = prev[prev.length - 1];
                const offset = Math.sin(prev.length / 5) * 0.2;
                const nextY = Math.max(50, Math.min(75, last.y + (Math.random() - 0.5) * 0.6 + offset));
                const nextX = last.x + 1;
                return [...prev.slice(1), { x: nextX, y: parseFloat(nextY.toFixed(1)) }];
            });

            setDataPointsC((prev) => {
                const last = prev[prev.length - 1];
                const offset = Math.cos(prev.length / 7) * 0.3;
                const nextY = Math.max(50, Math.min(75, last.y + (Math.random() - 0.5) * 0.6 + offset));
                const nextX = last.x + 1;
                return [...prev.slice(1), { x: nextX, y: parseFloat(nextY.toFixed(1)) }];
            });
        }, 500);

        return () => clearInterval(intervalRef.current!);
    }, []);

    const chartData = {
        datasets: [
            {
                label: "System A",
                data: dataPointsA,
                borderColor: "#5EBA46", // ✅ Green from logo
                borderWidth: 2,
                pointRadius: 0,
                tension: 0.2,
                parsing: false as const,
            },
            {
                label: "System B",
                data: dataPointsB,
                borderColor: "#45C1E0", // ✅ Light Blue
                borderWidth: 2,
                pointRadius: 0,
                tension: 0.2,
                parsing: false as const,
            },
            {
                label: "System C",
                data: dataPointsC,
                borderColor: "#00558C", // ✅ Dark Blue
                borderWidth: 2,
                pointRadius: 0,
                tension: 0.2,
                parsing: false as const,
            },
        ],
    };

    const options = {
        responsive: true,
        animation: {
            duration: 300,
            easing: "easeOutQuad" as const,
        },
        scales: {
            x: {
                type: "linear" as const,
                display: true,
                title: {
                    display: true,
                    text: "Time",
                    color: "#666",
                },
                ticks: {
                    color: "#888",
                    maxTicksLimit: 10,
                },
                grid: {
                    color: "rgba(200,200,200,0.1)",
                },
            },
            y: {
                display: true,
                title: {
                    display: true,
                    text: "Load (%)",
                    color: "#666",
                },
                ticks: {
                    color: "#888",
                    callback: (value: string | number) => `${Math.round(Number(value))} %`,
                },
                grid: {
                    color: "rgba(200,200,200,0.1)",
                },
            },
        },
        plugins: {
            legend: {
                display: true,
                labels: {
                    color: "#444",
                },
            },
            tooltip: {
                enabled: true,
                callbacks: {
                    label: function (context: any) {
                        const label = context.dataset.label || "";
                        const x = Math.round(context.parsed.x);
                        const y = context.parsed.y.toFixed(1);
                        return `${label} - X: ${x}, Y: ${y} %`;
                    },
                },
            },
        },
    };

    return (
        <div className="w-full h-full p-4 bg-gray-50 rounded-xl shadow-md border border-gray-200">
            <Line data={chartData} options={options} />
        </div>
    );
};

export default PlotDemo;
