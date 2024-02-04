"use client";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { usePersonStore } from "@/zustand/sotre";
import { useRouter } from "next/navigation";

export default function page() {
	const Name = usePersonStore((state) => state.Name);
	const updatetRole = usePersonStore((state) => state.updatetRole);
	const role = usePersonStore((state) => state.role);

	return (
		<>
			<div className=" h-screen w-screen flex items-center justify-center">
				<Card className="w-[650px] h-[380px]  mx-4  ">
					<CardHeader>
						<CardTitle className=" text-center font-semibold">
							Hey {Name} fill in few details!!
						</CardTitle>
						<CardDescription className=" text-center">
							Maybey we need to know you a bit more.
						</CardDescription>
					</CardHeader>

					<CardContent className=" flex  justify-around">
						{Name === "Astranaut" ? <Astranaut /> : <Rocket />}

						<div className="  flex  items-center   px-12 basis-2/3">
							<div className="  basis-full space-y-1">
								<Label htmlFor="name">Username</Label>
								<Input
									id="name"
									placeholder="your username"
									onChange={(e) => {
										updatetRole(e.target.value);
									}}
								/>
								{role === "" ? "" : role}
							</div>
						</div>
					</CardContent>
					<CardFooter className="  flex  basis-1/3    ">
						<div className=" basis-1/2"></div>

						<div className="  pr-10 basis-2/3  flex justify-between ">
							<Button>Back</Button>
							<Button
								onClick={(e) => {
									// useRouter().push("/{role}");
								}}>
								Next
							</Button>
						</div>
					</CardFooter>
				</Card>
			</div>
		</>
	);
}
