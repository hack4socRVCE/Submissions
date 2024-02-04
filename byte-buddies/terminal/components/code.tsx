/**
 * v0 by Vercel.
 * @see https://v0.dev/t/pJ5B78WgKhy
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import Link from "next/link";
import {
	TableHead,
	TableRow,
	TableHeader,
	TableCell,
	TableBody,
	Table,
} from "@/components/ui/table";

export default function Component() {
	return (
		<div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
			<div className="hidden border-r bg-gray-100/40 lg:block dark:bg-gray-800/40">
				<div className="flex h-full max-h-screen flex-col gap-2">
					<div className="flex h-[60px] items-center border-b px-6">
						<Link className="flex items-center gap-2 font-semibold" href="#">
							<TerminalIcon className="h-6 w-6" />
							<span className="">PowerShell Functions</span>
						</Link>
					</div>
					<div className="flex-1 overflow-auto py-2">
						<nav className="grid items-start px-4 text-sm font-medium">
							<Link
								className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
								href="#">
								<FunctionSquareIcon className="h-4 w-4" />
								Get-Process
							</Link>
							<Link
								className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
								href="#">
								<FunctionSquareIcon className="h-4 w-4" />
								Stop-Process
							</Link>
							<Link
								className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
								href="#">
								<FunctionSquareIcon className="h-4 w-4" />
								Start-Process
							</Link>
							<Link
								className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
								href="#">
								<FunctionSquareIcon className="h-4 w-4" />
								Get-Service
							</Link>
							<Link
								className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
								href="#">
								<FunctionSquareIcon className="h-4 w-4" />
								Stop-Service
							</Link>
							<Link
								className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
								href="#">
								<FunctionSquareIcon className="h-4 w-4" />
								Start-Service
							</Link>
						</nav>
					</div>
				</div>
			</div>
			<div className="flex flex-col">
				<header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40">
					<Link className="lg:hidden" href="#">
						<TerminalIcon className="h-6 w-6" />
						<span className="sr-only">Home</span>
					</Link>
				</header>
				<main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
					<div className="flex items-center">
						<h1 className="font-semibold text-lg md:text-2xl">Command Line</h1>
					</div>
					<div className="border shadow-sm rounded-lg">
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead className="w-[80px]">Time</TableHead>
									<TableHead className="max-w-[150px]">Command</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								<TableRow>
									<TableCell>12:34</TableCell>
									<TableCell className="font-medium">Get-Process</TableCell>
								</TableRow>
								<TableRow>
									<TableCell>12:35</TableCell>
									<TableCell className="font-medium">Stop-Process</TableCell>
								</TableRow>
								<TableRow>
									<TableCell>12:36</TableCell>
									<TableCell className="font-medium">Start-Process</TableCell>
								</TableRow>
								<TableRow>
									<TableCell>12:37</TableCell>
									<TableCell className="font-medium">Get-Service</TableCell>
								</TableRow>
								<TableRow>
									<TableCell>12:38</TableCell>
									<TableCell className="font-medium">Stop-Service</TableCell>
								</TableRow>
								<TableRow>
									<TableCell>12:39</TableCell>
									<TableCell className="font-medium">Start-Service</TableCell>
								</TableRow>
							</TableBody>
						</Table>
					</div>
				</main>
			</div>
		</div>
	);
}

function FunctionSquareIcon(props) {
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

function TerminalIcon(props) {
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
