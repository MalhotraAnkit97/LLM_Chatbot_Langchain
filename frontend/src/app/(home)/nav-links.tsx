"use client";

import Link from "next/link";
import {
	BarChartBig,
	Megaphone,
	MessagesSquare,
	Users,
	Settings,
	SquareChevronRight,
} from "lucide-react";

import { usePathname } from "next/navigation";
import clsx from "clsx";

// Map of links to display in the side navigation.
const links = [
	{ name: "Dashboard", href: "/dashboard", icon: BarChartBig },
	{ name: "Chat", href: "/chat", icon: MessagesSquare },
	{ name: "Moderation", href: "/moderation", icon: Megaphone },
	{ name: "Playground", href: "/playground", icon: SquareChevronRight },
	{ name: "Users", href: "/users", icon: Users },
	{ name: "Settings", href: "/settings", icon: Settings },
];

export default function NavLinks() {
	const pathname = usePathname();
	return (
		<nav className="grid items-start px-2 text-sm font-medium lg:px-4">
			{links.map((link) => {
				const LinkIcon = link.icon;
				return (
					<Link
						key={link.name}
						href={link.href}
						className={clsx(
							"flex items-center gap-3 rounded-lg px-3 py-4 text-muted-foreground transition-all hover:text-primary",
							{
								"bg-muted text-primary": pathname === link.href,
							}
						)}
					>
						<LinkIcon className="h-5 w-5" />
						{link.name}
					</Link>
				);
			})}
		</nav>
	);
}
