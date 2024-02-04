"use client";
import React, { MouseEvent, useRef } from "react";
import type { InteractionItem } from "chart.js";
import {
	Chart,
	getDatasetAtEvent,
	getElementAtEvent,
	getElementsAtEvent,
} from "react-chartjs-2";

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

import { useEffect, useState } from "react";
export default function Component() {
	ChartJS.register(
		LinearScale,
		CategoryScale,
		BarElement,
		PointElement,
		LineElement,
		Legend,
		Tooltip,
	);

	const options = {
		scales: {
			y: {
				beginAtZero: true,
			},
		},
	};
	const labels = [
		"Heart Rate",
		"Systol",
		"Diastol",
		"Respiratory Rate",
		"Body Temperature",
		"Oxygen Saturation",
		"Hydration Level",
		"Muscle Mass Index",
	];

	const [data, setData] = useState({
		labels,
		datasets: [
			{
				type: "line" as const,
				label: "Health details",
				borderColor: "rgb(255, 99, 132)",

				borderWidth: 2,
				fill: true,
				data: [120, 50, 111, 122, 123, 332, 223],
			},
		],
	});
	// const data = {
	// 	labels,
	// 	datasets: [
	// 		{
	// 			type: "line" as const,
	// 			label: "blood Pressure Status",
	// 			borderColor: "rgb(255, 99, 132)",

	// 			borderWidth: 2,
	// 			fill: true,
	// 			data: [120, 50, 111, 122, 123, 332, 223],
	// 		},
	// 	],
	// };

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

	const hello = useEffect(() => {
		const eventSource = new EventSource("http://localhost:3001/events");

		eventSource.onmessage = (event) => {
			const data1 = JSON.parse(event.data);
			// Handle the received data from the server
			console.log("Received data from server:", data1.values);
			setData((prevState) => ({
				...prevState,
				datasets: [
					{
						...prevState.datasets[0],
						data: data1,
					},
				],
			}));
		};

		eventSource.onerror = (error) => {
			console.error("Error with SSE connection:", error);
			eventSource.close();
		};

		return () => {
			eventSource.close();
		};
	}, []);

	return (
		<div className="border-4   basis-full ">
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
