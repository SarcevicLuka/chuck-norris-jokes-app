export class HttpError extends Error {
	public status;
	public message;

	constructor(status: number, message: string) {
		super(message);
		this.status = status;
		this.message = message;
	}
}
