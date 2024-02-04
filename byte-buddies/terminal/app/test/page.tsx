"use client";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

import { useEffect, useState } from "react";
export default function Component() {
	ChartJS.register(ArcElement, Tooltip, Legend);

	const [data, setData] = useState({
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
	});
	const hello = useEffect(() => {
		const eventSource = new EventSource("http://localhost:3001/events");

		eventSource.onmessage = (event) => {
			const data1 = JSON.parse(event.data);
			// Handle the received data from the server
			console.log("Received data from server:", data1);
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
		<div className="  border-4  w-[50%] basis-full md:basis-[40%]">
			<Pie data={data} />
		</div>
	);
}
