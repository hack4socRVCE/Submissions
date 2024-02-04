"use client";
import Pie1 from "@/components/Pie";
import Bar1 from "@/components/Bar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { CardContent, Card } from "@/components/ui/card";
import { usePersonStore } from "@/zustand/sotre";
import { useEffect, useState } from "react";

export default function Page() {
	const Name = usePersonStore((state) => state.Name);
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
		<>
			<div className="w-screen h-screen flex flex-wrap">
				<div className="md:basis-1/5  basis-full   flex-wrap flex min-h-screen flex-col">
					<Card className=" ">
						<div className=" w-full h-[25vh] flex justify-center items-end">
							<Avatar className="h-[125px] w-[125px] mr-5">
								<AvatarImage sizes=" " src="https://github.com/shadcn.png" />
								<AvatarFallback>CN</AvatarFallback>
							</Avatar>
						</div>
						<CardContent className="p-4 h-[75vh]  flex flex-col  space-y-9 items-stretch text-center">
							<h2 className="text-2xl pt-20 font-bold hover:text-gray-700 transition-all duration-200">
								{Name}
							</h2>
							<h3 className="text-gray-500 hover:text-gray-600 transition-all duration-200">
								NASA Astranaut
							</h3>
							<p className="mt-2 text-gray-600 hover:text-gray-700 transition-all duration-200">
								Passionate about space and the galaxy around.
							</p>
							<div className="flex  justify-center  flex-col mt-4   items-center  space-y-3">
								<Button
									className="w-full hover:bg-gray-700 hover:text-white transition-all duration-200"
									size="sm">
									Follow
								</Button>
								<Button
									className="w-full hover:border-gray-700 hover:text-gray-700 transition-all duration-200"
									size="sm">
									Message
								</Button>
							</div>
						</CardContent>
					</Card>
				</div>
				<div className="basis-4/5 max-h-screen flex flex-wrap gap-5    rounded-lg">
					<Bar1 data={data} />
					<ScrollArea className="h-[285px] gap-9 border-red-400 w-[550px]  rounded-md border p-1 basis-full">
						<div className=" grid grid-cols-4 my-5 rounded   border-2">
							<span className=" col-span-full ">Name</span>
							<span>'Heart Rate':</span>
							<span>'Diastol':</span>
							<span>'Respiratory Rate':</span>
							<span>'Body Temperature':</span>
							<span>'Oxygen Saturation':</span>
							<span>'Nutrient Intake':</span>
							<span>'Hydration Level':</span>
							<span>'Muscle Mass Index':</span>
						</div>
						<div className=" grid grid-cols-4 my-5 border-2 rounded-md">
							<span className=" col-span-full ">Name</span>
							<span>'Heart Rate':</span>
							<span>'Diastol':</span>
							<span>'Respiratory Rate':</span>
							<span>'Body Temperature':</span>
							<span>'Oxygen Saturation':</span>
							<span>'Nutrient Intake':</span>
							<span>'Hydration Level':</span>
							<span>'Muscle Mass Index':</span>
						</div>
						<div className=" grid grid-cols-4 my-5 rounded-md  border-2">
							<span className=" col-span-full ">Name</span>
							<span>'Heart Rate':</span>
							<span>'Diastol':</span>
							<span>'Respiratory Rate':</span>
							<span>'Body Temperature':</span>
							<span>'Oxygen Saturation':</span>
							<span>'Nutrient Intake':</span>
							<span>'Hydration Level':</span>
							<span>'Muscle Mass Index':</span>
						</div>
						<div className=" grid grid-cols-4 my-5 rounded-md  border-2">
							<span className=" col-span-full ">Name</span>
							<span>'Heart Rate':</span>
							<span>'Diastol':</span>
							<span>'Respiratory Rate':</span>
							<span>'Body Temperature':</span>
							<span>'Oxygen Saturation':</span>
							<span>'Nutrient Intake':</span>
							<span>'Hydration Level':</span>
							<span>'Muscle Mass Index':</span>
						</div>
						<div className=" grid grid-cols-4  my-5  rounded-md border-2">
							<span className=" col-span-full ">Name</span>
							<span>'Heart Rate':</span>
							<span>'Diastol':</span>
							<span>'Respiratory Rate':</span>
							<span>'Body Temperature':</span>
							<span>'Oxygen Saturation':</span>
							<span>'Nutrient Intake':</span>
							<span>'Hydration Level':</span>
							<span>'Muscle Mass Index':</span>
						</div>
						<div className=" grid grid-cols-4  my-5  rounded-md border-2">
							<span className=" col-span-full ">Name</span>
							<span>'Heart Rate':</span>
							<span>'Diastol':</span>
							<span>'Respiratory Rate':</span>
							<span>'Body Temperature':</span>
							<span>'Oxygen Saturation':</span>
							<span>'Nutrient Intake':</span>
							<span>'Hydration Level':</span>
							<span>'Muscle Mass Index':</span>
						</div>
						<div className=" grid grid-cols-4  my-5  rounded-md border-2">
							<span className=" col-span-full ">Name</span>
							<span>'Heart Rate':</span>
							<span>'Diastol':</span>
							<span>'Respiratory Rate':</span>
							<span>'Body Temperature':</span>
							<span>'Oxygen Saturation':</span>
							<span>'Nutrient Intake':</span>
							<span>'Hydration Level':</span>
							<span>'Muscle Mass Index':</span>
						</div>
						<div className=" grid grid-cols-4 my-5 rounded-md   border-2">
							<span className=" col-span-full ">Name</span>
							<span>'Heart Rate':</span>
							<span>'Diastol':</span>
							<span>'Respiratory Rate':</span>
							<span>'Body Temperature':</span>
							<span>'Oxygen Saturation':</span>
							<span>'Nutrient Intake':</span>
							<span>'Hydration Level':</span>
							<span>'Muscle Mass Index':</span>
						</div>
						<div className=" grid grid-cols-4  my-5  rounded-md border-2">
							<span className=" col-span-full ">Name</span>
							<span>'Heart Rate':</span>
							<span>'Diastol':</span>
							<span>'Respiratory Rate':</span>
							<span>'Body Temperature':</span>
							<span>'Oxygen Saturation':</span>
							<span>'Nutrient Intake':</span>
							<span>'Hydration Level':</span>
							<span>'Muscle Mass Index':</span>
						</div>
						<div className=" grid grid-cols-4 my-5  rounded-md  border-2">
							<span className=" col-span-full ">Name</span>
							<span>'Heart Rate':</span>
							<span>'Diastol':</span>
							<span>'Respiratory Rate':</span>
							<span>'Body Temperature':</span>
							<span>'Oxygen Saturation':</span>
							<span>'Nutrient Intake':</span>
							<span>'Hydration Level':</span>
							<span>'Muscle Mass Index':</span>
						</div>
					</ScrollArea>
				</div>
			</div>
		</>
	);
}
