import { PersonStanding } from "lucide-react";

// HumanMessage.tsx
function HumanMessageUI({ content }: { content: string }) {
	return (
		<div className="flex flex-col items-end justify-center">
			<div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
				<PersonStanding className="w-6 h-6" />
			</div>
			<div className="p-2 rounded-lg">
				<p className="text-sm">{content}</p>
			</div>
		</div>
	);
}

export default HumanMessageUI;
