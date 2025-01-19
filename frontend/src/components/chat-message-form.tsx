"use client";

import { Label } from "./ui/label";
import SendMessageButton from "./ui/send-message-button";
import { Textarea } from "./ui/textarea";
import { toast } from "sonner";
import { createChat, sendMessage } from "@/app/actions";
import { useRef, useState } from "react";
import { Message, NewChat } from "@/lib/types";

interface ChatMessageFormProps {
	onNewMessage: (messages: Message[]) => void;
	onNewChat: (newChat: NewChat) => void;
	onLocalUserMessage: (content: string) => void;
	chatId?: string;
	userId?: string;
	systemPrompt?: string;
}

export default function ChatMessageForm(props: ChatMessageFormProps) {
	const formRef = useRef<HTMLFormElement>(null);
	const [loading, setLoading] = useState(false);

	async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		if (loading) return;
		setLoading(true);

		if (!formRef.current) return;

		const formData = new FormData(event.currentTarget);

		// Add local user message first
		const message = formData.get("message") as string;
		props.onLocalUserMessage(message);

		if (props.systemPrompt) {
			formData.append("system_prompt", props.systemPrompt);
		}

		// Get response from the AI
		let response = null;
		try {
			if (!props.chatId) {
				response = await handleCreateChat(formData);
				props.onNewChat(response);
			} else {
				response = await handleSendMessage(formData);
				props.onNewMessage(response.messages);
			}
		} catch (ex: any) {
			toast.error(ex.message);
		}

		// Clear the form
		setLoading(false);
		formRef.current?.reset();
	}

	async function handleSendMessage(formData: FormData) {
		if (!props.chatId) {
			throw new Error("Chat ID is required to send a message");
		}
		return sendMessage(formData, props.chatId);
	}

	async function handleCreateChat(formData: FormData) {
		if (!props.userId) {
			throw new Error("User ID is required to create a chat");
		}

		formData.append("chatId", props.chatId || "");
		return createChat(formData, props.userId);
	}

	return (
		<form
			ref={formRef}
			className="relative overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring"
			x-chunk="dashboard-03-chunk-1"
			onSubmit={handleSubmit}
		>
			<Label htmlFor="message" className="sr-only">
				Message
			</Label>
			<Textarea
				id="message"
				name="message"
				placeholder="Type your message here..."
				className="min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0"
			/>
			<div className="flex items-center p-3 pt-0">
				<SendMessageButton disabled={loading} />
			</div>
		</form>
	);
}
