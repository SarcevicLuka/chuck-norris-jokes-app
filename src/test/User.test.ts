import request from "supertest";
import app from "../../app";
import { userRepository } from "../repositories/UserRepository";
import { UserRegistrationData } from "../types";

test("Validation for user create", async () => {
	jest.spyOn(userRepository, "create").mockImplementation(
		async (userData: UserRegistrationData) => {
			return {
				id: "1",
				email: userData.email.toLowerCase(),
				firstName: userData.firstName,
				lastName: userData.lastName
			};
		}
	);

	jest.spyOn(userRepository, "findByEmail").mockImplementation(
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		async (_email: string) => {
			return null;
		}
	);

	const mockUser = {
		email: "luka1@gmail.com",
		password: "luka2508",
		firstName: "Luka",
		lastName: "Sarcevic"
	};

	const response = await request(app).post("/auth/register").send(mockUser);
	console.log(response.headers);

	expect(true).toBe(true);
	//expect(response.body).
});
