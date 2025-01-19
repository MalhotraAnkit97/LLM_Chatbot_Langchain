import { Separator } from "@/components/ui/separator";
import { Message } from "@/lib/types";
import MessageUI from "./message";

export interface ChatList {
	messages: Message[];
}

export function ChatList({ messages }: ChatList) {
	if (!messages.length) {
		return null;
	}

	return (
		<div className="relative mx-auto max-w-2xl px-4">
			{messages.map((message, index) => (
				<div key={message.id}>
					<MessageUI role={message.role} content={message.content} />
					{index < messages.length - 1 && <Separator className="my-4" />}
				</div>
			))}
		</div>
	);
}
