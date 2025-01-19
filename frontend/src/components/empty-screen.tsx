export function EmptyScreen() {
	return (
		<div className="mx-auto max-w-2xl px-4">
			<div className="flex flex-col gap-2 rounded-lg border bg-background p-8">
				<h1 className="text-lg font-semibold">
					Welcome to the InPower AI Prompt Playground
				</h1>
				<p className="leading-normal text-muted-foreground">
					Change the model settings on the right and start chatting with the AI.
				</p>
			</div>
		</div>
	);
}
