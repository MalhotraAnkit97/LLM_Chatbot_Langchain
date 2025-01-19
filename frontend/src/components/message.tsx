import { Role } from "@/lib/types";
import AIMessage from "./message-ai";
import HumanMessage from "./message-human";

export interface MessageUIProps {
	role: Role;
	content: string;
}

export default function MessageUI({ role, content }: MessageUIProps) {
	return role === Role.HUMAN ? (
		<HumanMessage content={content} />
	) : (
		<AIMessage content={content} />
	);
}
