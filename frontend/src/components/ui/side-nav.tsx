import Link from "next/link";
import { BotMessageSquare } from "lucide-react";
import NavLinks from "@/app/(home)/nav-links";

function SideNav() {
	return (
		<div className="flex h-full max-h-screen flex-col gap-2">
			<div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
				<Link
					href="/home/dashboard"
					className="flex items-center gap-2 font-semibold"
				>
					<BotMessageSquare className="h-6 w-6" />
					<span className="">Prompter AI</span>
				</Link>
			</div>
			<div className="flex-1">
				<NavLinks />
			</div>
		</div>
	);
}

export default SideNav;
