// Registration data that is sent to the api
export type UserRegistrationData = {
	email: string;
	password: string;
	firstName: string;
	lastName: string;
};

// Login data that is sent to the api
export type UserLoginData = {
	email: string;
	password: string;
};

// User data response without the password
export type UserDataResponse = {
	id: string;
	email: string;
	firstName: string;
	lastName: string;
};

// Password which will be verified with login data
export type UserDataPasswordResponse = {
	password: string;
};

// JWT token
export type Token = {
	jwt: string;
};

// Joke text response from chucknorris joke api
export type Joke = {
	jokeText: string;
};

// Email message template for nodemailer
export type EmailMessage = {
	from: string;
	to: string;
	subject: string;
	text: string;
};
