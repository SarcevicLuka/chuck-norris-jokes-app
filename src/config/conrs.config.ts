export const corsConfig = {
	exposedHeaders: ["authoization", "content-type", "content-length"],
	allowedHeaders: [
		"authorization",
		"accept",
		"content-type",
		"origin",
		"access-control-request-method"
	],
	methods: ["POST", "GET"]
};
