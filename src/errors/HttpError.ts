class HttpError extends Error {
	public status;
	public message: string;

	constructor(status: number, message: string) {
		super(message);
		this.status = status;
		this.message = message;
	}
}

export { HttpError };
