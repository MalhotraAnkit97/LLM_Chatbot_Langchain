"use client";

import { Settings } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
	Drawer,
	DrawerContent,
	DrawerDescription,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@/components/ui/drawer";
import PlaygroundSettings from "@/components/playground-settings";
import { Chat } from "@/components/chat";
import { Role, Message, NewChat } from "@/lib/types";

import ChatMessageForm from "@/components/chat-message-form";
import { useState } from "react";

const USER_ID = "71404167-6376-430f-b504-98004560e862";

const MESSAGES = [
	{
		id: "1",
		chatId: "chat1",
		role: Role.AI,
		content: "Hi, how can I help you right now?",
		createdAt: new Date("2022-01-01T12:00:00Z"),
	},
];

function Playground() {
	const [chatId, setChatId] = useState<string | undefined>();
	const [userId, setUserId] = useState<string | undefined>(USER_ID);
	const [systemPrompt, setSystemPrompt] = useState<string | undefined>();
	const [messages, setMessages] = useState<Message[]>(MESSAGES);

	const handleAddMessage = (message: Message) => {
		setMessages((messages) => [...messages, message]);
	};

	const addLocalUserMessage = (content: string) => {
		const message: Message = {
			id: String(Date.now()),
			chatId: chatId || "",
			role: Role.HUMAN,
			content,
			createdAt: new Date(),
		};
		handleAddMessage(message);
	};

	const handleNewMessage = (messages: Message[]) => {
		const aiMessage = messages.find((message) => message.role === Role.AI);
		if (aiMessage) {
			handleAddMessage(aiMessage);
		}
	};

	const handleNewChat = (newChat: NewChat) => {
		setChatId(newChat.chatId);
		const aiMessage = newChat.messages.find(
			(message) => message.role === Role.AI
		);
		if (aiMessage) {
			handleAddMessage(aiMessage);
		}
	};

	return (
		<div className="grid h-full w-full">
			<div className="flex flex-col">
				<div className="flex items-center">
					<h1 className="text-lg font-semibold md:text-2xl">Playground</h1>
				</div>
				<main className="grid flex-1 gap-4 overflow-auto p-4 md:grid-cols-2 lg:grid-cols-3">
					<div className="relative flex h-full min-h-[50vh] flex-col rounded-xl bg-muted/50 p-4 lg:col-span-2">
						<div className="flex-1">
							<Chat messages={messages ?? []} />
						</div>
						<ChatMessageForm
							onNewMessage={handleNewMessage}
							onNewChat={handleNewChat}
							onLocalUserMessage={addLocalUserMessage}
							systemPrompt={systemPrompt}
							chatId={chatId}
							userId={userId}
						/>
					</div>
					<div
						className="relative hidden flex-col items-start gap-8 md:flex"
						x-chunk="dashboard-03-chunk-0"
					>
						<PlaygroundSettings onChangeSystemPrompt={setSystemPrompt} />
					</div>
				</main>
				<Drawer>
					<DrawerTrigger asChild>
						<Button variant="ghost" size="icon" className="md:hidden">
							<Settings className="size-4" />
							<span className="sr-only">Settings</span>
						</Button>
					</DrawerTrigger>
					<DrawerContent className="max-h-[90vh]">
						<DrawerHeader>
							<DrawerTitle>Configuration</DrawerTitle>
							<DrawerDescription>
								Configure the settings for the model and messages.
							</DrawerDescription>
						</DrawerHeader>
						<PlaygroundSettings onChangeSystemPrompt={setSystemPrompt} />
					</DrawerContent>
				</Drawer>
			</div>
		</div>
	);
}

export default Playground;
