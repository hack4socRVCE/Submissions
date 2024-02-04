import Tab from "@/components/Tab";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup,
} from "@/components/ui/resizable";

export default async function Page() {
	let data = await fetch("https://api.spacexdata.com/v4/launches/latest");
	let myArray = new Array(5).fill(0).map((_, index) => index + 1);

	return (
		<>
			<div className=" flex   ">
				<ResizablePanelGroup direction="horizontal">
					<ResizablePanel defaultSize={25} minSize={15} maxSize={35}>
						<div className=" basis-1/3">
							<div className="flex h-full max-h-screen flex-col gap-2">
								<div className="flex h-[60px] items-center border-b px-6">
									<Link
										className="flex items-center gap-2 font-semibold"
										href="#">
										<span className="">Dashboard</span>
									</Link>
								</div>
								<div className="flex-1 overflow-auto py-2">
									<nav className="grid items-start px-4 text-sm font-medium">
										<Link
											className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
											href="#">
											Profile
										</Link>
										<Link
											className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
											href="#">
											Login
										</Link>
									</nav>
								</div>
							</div>
						</div>
					</ResizablePanel>
					<ResizableHandle />
					<ResizablePanel defaultSize={75} className=" overflow-auto">
						<div className=" basis-2/3    h-screen flex justify-center items-center border-2">
							<div className=" flex-col ">
								<h2 className="  text-2xl  py-3 font-semibold italic underline">
									These are the details of Our Astranauts
								</h2>
								<div className=" border-2 rounded-lg p-2">
									<Tab
										astranaut="astranaut"
										active="active"
										current="space"
										className="bg-slate-300"
									/>
									{myArray.map((item) => (
										<Tab astranaut="Hithesh" active="now" current="old" />
									))}
								</div>
								<div className=" flex justify-between ">
									<div className=" basis-1/2"></div>
									<div className="flex basis-1/2 justify-between py-10  ">
										<Button>Previous</Button>
										<Button> Next</Button>
									</div>
								</div>
							</div>
						</div>
					</ResizablePanel>
				</ResizablePanelGroup>
			</div>
		</>
	);
}

function FunctionSquareIcon(props: any) {
	return (
		<svg
			{...props}
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round">
			<rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
			<path d="M9 17c2 0 2.8-1 2.8-2.8V10c0-2 1-3.3 3.2-3" />
			<path d="M9 11.2h5.7" />
		</svg>
	);
}

function TerminalIcon(props: any) {
	return (
		<svg
			{...props}
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round">
			<polyline points="4 17 10 11 4 5" />
			<line x1="12" x2="20" y1="19" y2="19" />
		</svg>
	);
}
