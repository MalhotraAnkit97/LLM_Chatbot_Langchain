"use server";

export async function createChat(formData: FormData, userId: string) {
	const url = `http://localhost:8000/api/conversation/users/${userId}/chats`;

	// Create a new chat
	try {
		const res = await fetch(url, {
			method: "POST",
			body: formData,
		});

		if (!res.ok) {
			console.error("Failed to create chat");
			return {
				error: "Failed to create chat",
			};
		}

		return res.json();
	} catch (ex) {
		console.error(ex);
		return {
			error: "Failed to create chat",
		};
	}
}

export async function sendMessage(formData: FormData, chatId: string) {
	const url = `http://localhost:8000/api/conversation/chats/${chatId}/messages/`;

	// Send message to the server
	try {
		const res = await fetch(url, {
			method: "POST",
			body: formData,
		});

		if (!res.ok) {
			console.error("Failed to send message");
			return {
				error: "Failed to send message",
			};
		}

		return res.json();
	} catch (ex) {
		console.error(ex);
		return {
			error: "Failed to send message",
		};
	}
}
