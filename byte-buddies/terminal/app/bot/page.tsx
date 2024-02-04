"use client";
import Hi from "./m.jpeg";
import Sugar from "./sugar.jpeg";
import { useRouter } from "next/navigation";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Meditate } from "./meditate";

import Image from "next/image";
export default function Page() {
	const router = useRouter();

	return (
		<>
			<div className=" w-screen h-screen  gap-5   flex justify-center items-center">
				<Card
					className=" hover:shadow-1xl hover:cursor-pointer hover:scale-105 "
					onClick={(e) => {
						console.log("clicked");
						router.push(
							"https://mediafiles.botpress.cloud/4c00427a-7e16-47d5-b699-ad604b287a99/webchat/bot.html",
						);
					}}>
					<CardHeader className=" text-center">
						<CardTitle> Chat mindfulness</CardTitle>
						<CardDescription>
							chat making you mental peace easier
						</CardDescription>
					</CardHeader>
					<CardContent className=" flex  justify-center items-center ">
						<Image
							src={Hi}
							width={200}
							height={150}
							className=" rounded-lg  "
						/>
					</CardContent>
					<CardFooter className=" text-center ">
						<p className=" text-2xl mb-4">Meditate</p>
					</CardFooter>
				</Card>

				<Card
					className=" hover:shadow-1xl  hover:scale-105 hover:cursor-pointer"
					onClick={(e) => {
						console.log("clicked");
						router.push(
							"https://mediafiles.botpress.cloud/65d890ff-3125-4a9c-a1c1-0e9edcfa1761/webchat/bot.html",
						);
					}}>
					<CardHeader className=" text-center">
						<CardTitle> Chat Guidence</CardTitle>
						<CardDescription>
							chat letting you have a better mind
						</CardDescription>
					</CardHeader>
					<CardContent className=" flex h-[200px]  justify-center items-center ">
						<Image
							src={Sugar}
							width={200}
							height={250}
							className=" rounded-lg  "
						/>
					</CardContent>
					<CardFooter className=" py-6 text-center ">
						<p className=" text-2xl mb-4">Guidance</p>
					</CardFooter>
				</Card>
			</div>
		</>
	);
}
