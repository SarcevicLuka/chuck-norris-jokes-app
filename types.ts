export type UserRegistrationData = {
	email: string;
	password: string;
	firstName: string;
	lastName: string;
};

export type UserLoginData = {
	email: string;
	password: string;
};

export type UserDataResponse = {
	id: string;
	email: string;
	firstName: string;
	lastName: string;
};

export type Token = {
	jwt: string;
};

export type EmailMessage = {
	from: string;
	to: string;
	subject: string;
	text: string;
};
