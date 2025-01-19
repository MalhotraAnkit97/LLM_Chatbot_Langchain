"use client";

import { useState } from "react";
import { useScrollAnchor } from "@/lib/hooks/use-scroll-anchor";
import { Message } from "@/lib/types";
import { cn } from "@/lib/utils";
import { ChatList } from "./chat-list";
import { EmptyScreen } from "./empty-screen";

export interface ChatProps extends React.ComponentProps<"div"> {
	messages: Message[];
	id?: string;
}

export function Chat({ id, className, messages }: ChatProps) {
	const { messagesRef, scrollRef, visibilityRef, isAtBottom, scrollToBottom } =
		useScrollAnchor();

	return (
		<div
			className="group w-full overflow-auto pl-0 peer-[[data-state=open]]:lg:pl-[250px] peer-[[data-state=open]]:xl:pl-[300px]"
			ref={scrollRef}
		>
			<div
				className={cn("pb-[200px] pt-4 md:pt-10", className)}
				ref={messagesRef}
			>
				{messages.length ? <ChatList messages={messages} /> : <EmptyScreen />}
				<div className="w-full h-px" ref={visibilityRef} />
			</div>
		</div>
	);
}
