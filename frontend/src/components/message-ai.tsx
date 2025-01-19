import { Bot } from "lucide-react";

// AIMessage.tsx
function AIMessageUI({ content }: { content: string }) {
	return (
		<div className="flex flex-col items-left">
			<div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
				<Bot className="w-5 h-5" />
			</div>
			<div className="p-2 rounded-lg">
				<p className="text-sm">{content}</p>
			</div>
		</div>
	);
}

export default AIMessageUI;
