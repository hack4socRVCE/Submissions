"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

const formSchema = z.object({
	username: z.string().min(2, {
		message: "Username must be at least 2 characters.",
	}),
	heartRate: z.number().int().min(20).max(200),
	systol: z.number().int().min(80).max(180),
	diastol: z.number().int().min(50).max(120),
	respiratoryRate: z.number().int().min(10).max(30),
	bodyTemperature: z.number().min(35).max(42),
	oxygenSaturation: z.number().min(90).max(100),
	hydrationLevel: z.number().min(0).max(100),
	muscleMassIndex: z.number().min(10).max(40),
});

export default function ProfileForm() {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			username: "",
			heartRate: 0,
			systol: 0,
			diastol: 0,
			respiratoryRate: 0,
			bodyTemperature: 0,
			oxygenSaturation: 0,
			hydrationLevel: 0,
			muscleMassIndex: 0,
		},
	});

	// 2. Define a submit handler.
	function onSubmit(values: z.infer<typeof formSchema>) {
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
		console.log(values);
	}

	// ...

	return (
		<div className=" flex  justify-center  w-screen h-screen   items-center">
			<Card className=" border-2      ">
				<CardHeader>
					<CardTitle className=" ml-5 text-3xl">
						Astranaut status Test
					</CardTitle>
					<CardDescription className=" ml-5">
						Are you clear to fly.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className="  flex flex-wrap w-[900px]   justify-evenly 	">
							<FormField
								control={form.control}
								name="username"
								render={({ field }) => (
									<FormItem className=" basis-full mx-3	 ">
										<FormLabel className=" ml-4">Username</FormLabel>
										<FormControl>
											<Input
												placeholder="username"
												className=" w-[300px] ml-4"
												{...field}
											/>
										</FormControl>
										<FormDescription className=" ml-4">
											This is your public display name.
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="heartRate"
								render={({ field }) => (
									<FormItem className=" basis-[45%] w-[120px] ">
										<FormLabel>Heart rate</FormLabel>
										<FormControl>
											<Input type="number" placeholder="********" {...field} />
										</FormControl>
										<FormDescription>Recent Heart rate .</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="systol"
								render={({ field }) => (
									<FormItem className=" basis-[45%]  w-[120px]">
										<FormLabel>systol</FormLabel>
										<FormControl>
											<Input placeholder="123 Main St" {...field} />
										</FormControl>
										<FormDescription>Put your Systol.</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="diastol"
								render={({ field }) => (
									<FormItem className=" basis-[45%] w-[120px]">
										<FormLabel>diastol Rate</FormLabel>
										<FormControl>
											<Input placeholder="diastol" {...field} />
										</FormControl>
										<FormDescription>Put your diastol Rate.</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="respiratoryRate"
								render={({ field }) => (
									<FormItem className=" basis-[45%] w-[120px]">
										<FormLabel>respiratory Rate</FormLabel>
										<FormControl>
											<Input placeholder="respiratoryRate" {...field} />
										</FormControl>
										<FormDescription>
											Put your respiratory Rate.
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="bodyTemperature"
								render={({ field }) => (
									<FormItem className=" basis-[45%] w-[120px]">
										<FormLabel>body Temperature</FormLabel>
										<FormControl>
											<Input placeholder="bodyTemperature" {...field} />
										</FormControl>
										<FormDescription>Put your bodyTemperature.</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="oxygenSaturation"
								render={({ field }) => (
									<FormItem className=" basis-[45%] w-[120px]">
										<FormLabel>oxygen Saturation</FormLabel>
										<FormControl>
											<Input placeholder="oxygenSaturation" {...field} />
										</FormControl>
										<FormDescription>
											Put your oxygenSaturation.
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="hydrationLevel"
								render={({ field }) => (
									<FormItem className=" basis-[45%] w-[120px]">
										<FormLabel>hydration Level</FormLabel>
										<FormControl>
											<Input placeholder="hydrationLevel" {...field} />
										</FormControl>
										<FormDescription>Put your hydrationLevel.</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="muscleMassIndex"
								render={({ field }) => (
									<FormItem className=" basis-[45%] w-[120px]">
										<FormLabel>muscle MassIndex</FormLabel>
										<FormControl>
											<Input placeholder="hydrationLevel" {...field} />
										</FormControl>
										<FormDescription>Put your muscleMassIndex.</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
							<div className=" ml-6 basis-full">
								<Button
									className=" ml-auto  mt-5  basis-full w-[100px]"
									type="submit">
									Submit
								</Button>
							</div>
						</form>
					</Form>
				</CardContent>
			</Card>
		</div>
	);
}
