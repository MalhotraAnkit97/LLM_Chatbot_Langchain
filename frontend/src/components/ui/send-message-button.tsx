"use client";

import { CornerDownLeft, Loader } from "lucide-react";
import { Button } from "./button";
import { useFormStatus } from "react-dom";

interface SendMessageButtonProps {
	disabled: boolean;
}

export default function SendMessageButton({
	disabled,
}: SendMessageButtonProps) {
	return (
		<Button
			type="submit"
			size="sm"
			className="ml-auto gap-1.5"
			disabled={disabled}
		>
			Send Message
			{disabled ? (
				<Loader className="size-3.5" />
			) : (
				<CornerDownLeft className="size-3.5" />
			)}
		</Button>
	);
}
