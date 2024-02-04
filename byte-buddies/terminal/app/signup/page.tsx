"use client";
import * as React from "react";

import Image from "next/image";
import Start from "../../star.jpeg";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import Astranaut from "@/components/Astranaut";
import Rocket from "@/components/Rocket";

export default function CardWithForm() {
	return (
		<div className= " h-screen w-screen flex items-center justify-center">
			<div className=" absolute -z-10 w-screen h-screen "  >
				<Image 
		layout="fill"
        objectFit="cover"
        objectPosition="center"
             src={Start }/>


			</div>
			<Card className="w-[550px] h-[380px] align-middle">
				<CardHeader>
					<CardTitle className=" text-center font-semibold">
						Who are you
					</CardTitle>
					<CardDescription className=" text-center">
						An astranaut or a dataman.
					</CardDescription>
				</CardHeader>

				<CardContent className=" flex  justify-around">
					<Astranaut />
					<Rocket />
				</CardContent>

				<CardFooter className="flex justify-between"></CardFooter>
			</Card>
		</div>
	);
}
