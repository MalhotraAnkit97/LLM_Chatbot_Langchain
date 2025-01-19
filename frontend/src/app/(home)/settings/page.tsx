import { Button } from "@/components/ui/button";

function SettingsPage() {
	return (
		<div className="flex flex-1 flex-col">
			<div className="flex items-center">
				<h1 className="text-lg font-semibold md:text-2xl">Settings</h1>
			</div>
			<div
				className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm"
				x-chunk="dashboard-02-chunk-1"
			>
				<div className="flex flex-col items-center gap-1 text-center">
					<h3 className="text-2xl font-bold tracking-tight">
						You have no settings
					</h3>
					<p className="text-sm text-muted-foreground">
						You can start selling as soon as you add a setting.
					</p>
					<Button className="mt-4">Add Setting</Button>
				</div>
			</div>
		</div>
	);
}

export default SettingsPage;
