"use client";
import React, { MouseEvent, useRef } from "react";
import type { InteractionItem } from "chart.js";
import {
	Chart as ChartJS,
	LinearScale,
	CategoryScale,
	BarElement,
	PointElement,
	LineElement,
	Legend,
	Tooltip,
} from "chart.js";
import { Pie } from "react-chartjs-2";

import {
	Chart,
	getDatasetAtEvent,
	getElementAtEvent,
	getElementsAtEvent,
} from "react-chartjs-2";

ChartJS.register(
	LinearScale,
	CategoryScale,
	BarElement,
	PointElement,
	LineElement,
	Legend,
	Tooltip,
);

export const options = {
	scales: {
		y: {
			beginAtZero: true,
		},
	},
};

const labels = [
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday",
	"sunday",
];
export const data1 = {
	labels: ["protein", "carbs", "fat", "vitamins", "minerals", "fiber"],
	datasets: [
		{
			label: "# of Votes",
			data: [12, 19, 3, 5, 2, 3],
			backgroundColor: [
				"rgba(255, 99, 132, 0.2)",
				"rgba(54, 162, 235, 0.2)",
				"rgba(255, 206, 86, 0.2)",
				"rgba(75, 192, 192, 0.2)",
				"rgba(153, 102, 255, 0.2)",
				"rgba(255, 159, 64, 0.2)",
			],
			borderColor: [
				"rgba(255, 99, 132, 1)",
				"rgba(54, 162, 235, 1)",
				"rgba(255, 206, 86, 1)",
				"rgba(75, 192, 192, 1)",
				"rgba(153, 102, 255, 1)",
				"rgba(255, 159, 64, 1)",
			],
			borderWidth: 1,
		},
	],
};

export default function Bar1({ data }) {
	const printDatasetAtEvent = (dataset: InteractionItem[]) => {
		if (!dataset.length) return;

		const datasetIndex = dataset[0].datasetIndex;

		console.log(data.datasets[datasetIndex].label);
	};

	const printElementAtEvent = (element: InteractionItem[]) => {
		if (!element.length) return;

		const { datasetIndex, index } = element[0];

		console.log(data.labels[index], data.datasets[datasetIndex].data[index]);
	};

	const printElementsAtEvent = (elements: InteractionItem[]) => {
		if (!elements.length) return;

		console.log(elements.length);
	};

	const chartRef = useRef<ChartJS>(null);

	const onClick = (event: MouseEvent<HTMLCanvasElement>) => {
		const { current: chart } = chartRef;

		if (!chart) {
			return;
		}

		printDatasetAtEvent(getDatasetAtEvent(chart, event));
		printElementAtEvent(getElementAtEvent(chart, event));
		printElementsAtEvent(getElementsAtEvent(chart, event));
	};

	return (
		<div className="border-4    basis-full md:basis-[45%]">
			<Chart
				ref={chartRef}
				type="bar"
				onClick={onClick}
				options={options}
				data={data}
			/>
		</div>
	);
}
