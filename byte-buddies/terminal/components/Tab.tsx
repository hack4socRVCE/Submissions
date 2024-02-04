import Link from "next/link";
export default function Tab({
	astranaut = "astranaut",
	active = "active",
	current = "space",
	className = "bg-white",
}: {
	astranaut: string;
	active: string;
	current: string;
	className?: string;
}) {
	return (
		<Link href={"#"}>
			<div className=" w-[700px]  hover:bg-slate-50  px-2    border-b-2  py-5 flex ">
				<p className="  font-semibold basis-1/3">{astranaut}</p>
				<p className="  font-semibold basis-1/3">{active} </p>
				<p className="   font-semibold basis-1/3">{current}</p>
			</div>
		</Link>
	);
}
