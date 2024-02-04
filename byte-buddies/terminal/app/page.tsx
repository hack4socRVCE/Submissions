import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Astranaut from "@/components/Astranaut";

export default function Component() {
	return (
		<section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 ">
			<div className="absolute inset-0 -z-20     top-50 border-2 ">
				<Astranaut />
			</div>
			<div className="container px-4 md:px-6  ">
				<div className="flex flex-col items-center space-y-4 text-center ">
					<div className="space-y-2">
						<h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none bg-gradient-to-r from-black to-gray-800 text-transparent bg-clip-text">
							The Space Guy
						</h1>
						<p className="mx-auto max-w-[700px]    text-black md:text-xl dark:text-gray-400">
							Experience the benefits of our product and services. We provide
							top-notch quality and exceptional customer service.
						</p>
					</div>
					<div className="w-full max-w-sm space-y-2">
						<form className="flex flex-col space-y-2">
							<Input
								className="max-w-lg flex-1"
								placeholder="Enter your name"
								type="text"
							/>
							<Input
								className="max-w-lg flex-1"
								placeholder="Enter your email"
								type="email"
							/>
							<Button type="submit">Subscribe</Button>
						</form>
					</div>
				</div>
			</div>
		</section>
	);
}
