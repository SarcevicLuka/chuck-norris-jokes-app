import request from "supertest";
import app from "../../app";
import User from "../models/User";
import { userRepository } from "../repositories/UserRepository";
import { UserRegistrationData } from "../types";
import { HttpError } from "../errors/HttpError";
import { authService } from "../services/AuthService";
import { describe } from "node:test";
import { UserMapper } from "../utils/mappers/UserMapper";

describe("Mail sending testing", () => {
	afterEach(() => {
		jest.restoreAllMocks();
	});
	describe("Registration testing", () => {
		it("Should register and return 201 Created", async () => {
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
				email: "test@test.com",
				password: "testPass",
				firstName: "John",
				lastName: "Doe"
			};

			const response = await request(app)
				.post("/auth/register")
				.send(mockUser);

			expect(response.status).toBe(201);
			expect(response.body).toStrictEqual({
				email: "test@test.com",
				firstName: "John",
				id: "1",
				lastName: "Doe"
			});
			expect(response.headers["authorization"]).toBeDefined();
		});

		it("Should return 409 email already in use", async () => {
			jest.spyOn(userRepository, "findByEmail").mockImplementation(
				// eslint-disable-next-line @typescript-eslint/no-unused-vars
				async (email: string) => {
					return {
						id: "1",
						email: email,
						password: "password",
						firstName: "John",
						lastName: "Doe"
					} as User;
				}
			);

			const mockUser1 = {
				email: "test@test.com",
				password: "testPass",
				firstName: "John",
				lastName: "Doe"
			};

			const mockUser2 = {
				email: "test@test.com",
				password: "testPass2",
				firstName: "John2",
				lastName: "Doe2"
			};

			await request(app).post("/auth/register").send(mockUser1);

			const response = await request(app)
				.post("/auth/register")
				.send(mockUser2);

			expect(response.status).toBe(409);
			expect(response.body).toStrictEqual({
				message: "Email already in use"
			});
		});

		it("Should return 500 error creating user", async () => {
			jest.spyOn(userRepository, "create").mockImplementation(
				// eslint-disable-next-line @typescript-eslint/no-unused-vars
				async (userData: UserRegistrationData) => {
					throw new HttpError(500, "Error creating user");
				}
			);

			jest.spyOn(userRepository, "findByEmail").mockImplementation(
				// eslint-disable-next-line @typescript-eslint/no-unused-vars
				async (_email: string) => {
					return null;
				}
			);

			const mockUser = {
				email: "test@test.com",
				password: "testPass",
				firstName: "John",
				lastName: "Doe"
			};

			const response = await request(app)
				.post("/auth/register")
				.send(mockUser);

			expect(response.status).toBe(500);
			expect(response.body).toStrictEqual({
				message: "Error creating user"
			});
		});

		it("Should return 500 error in creating JWT token", async () => {
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

			jest.spyOn(authService, "createJWT").mockImplementation(
				// eslint-disable-next-line @typescript-eslint/no-unused-vars
				async (userId: string) => {
					throw new HttpError(500, "Error in creating JWT token");
				}
			);

			jest.spyOn(userRepository, "findByEmail").mockImplementation(
				// eslint-disable-next-line @typescript-eslint/no-unused-vars
				async (_email: string) => {
					return null;
				}
			);

			const mockUser = {
				email: "test@test.com",
				password: "testPass",
				firstName: "John",
				lastName: "Doe"
			};

			const response = await request(app)
				.post("/auth/register")
				.send(mockUser);

			expect(response.status).toBe(500);
			expect(response.body).toStrictEqual({
				message: "Error in creating JWT token"
			});
		});
	});

	describe("Login testing", () => {
		it("Should return 200 and user data", async () => {
			jest.spyOn(userRepository, "findByEmail").mockImplementation(
				// eslint-disable-next-line @typescript-eslint/no-unused-vars
				async (email: string) => {
					return {
						id: "1",
						email: email,
						password: "testPass",
						firstName: "John",
						lastName: "Doe"
					} as User;
				}
			);

			jest.spyOn(
				UserMapper,
				"mapUserModelToPasswordResponse"
			).mockImplementation(
				// eslint-disable-next-line @typescript-eslint/no-unused-vars
				(user: User) => {
					return {
						password:
							"$2b$10$v1FG0U5OJpFG9xU7485VQ.uudik8Z/fEjnD1IDPkX5/4mLT8eAL/q"
					};
				}
			);

			const mockUser = {
				email: "test@test.com",
				password: "luka2508"
			};

			const response = await request(app)
				.post("/auth/login")
				.send(mockUser);

			expect(response.status).toBe(200);
			expect(response.body).toStrictEqual({
				email: "test@test.com",
				firstName: "John",
				id: "1",
				lastName: "Doe"
			});
			expect(response.headers["authorization"]).toBeDefined();
		});

		it("Should return 401 wrong credentials because no user exists with given email", async () => {
			jest.spyOn(userRepository, "findByEmail").mockImplementation(
				// eslint-disable-next-line @typescript-eslint/no-unused-vars
				async (email: string) => {
					return null;
				}
			);

			const mockUser = {
				email: "test@test.com",
				password: "luka2508"
			};

			const response = await request(app)
				.post("/auth/login")
				.send(mockUser);

			expect(response.status).toBe(401);
			expect(response.body).toStrictEqual({
				message: "Wrong credentials"
			});
		});

		it("Should return 401 wrong credentials because password is incorrect", async () => {
			jest.spyOn(userRepository, "findByEmail").mockImplementation(
				// eslint-disable-next-line @typescript-eslint/no-unused-vars
				async (email: string) => {
					return {
						id: "1",
						email: email,
						password: "testPass",
						firstName: "John",
						lastName: "Doe"
					} as User;
				}
			);

			jest.spyOn(
				UserMapper,
				"mapUserModelToPasswordResponse"
			).mockImplementation(
				// eslint-disable-next-line @typescript-eslint/no-unused-vars
				(user: User) => {
					return {
						password: "testPass"
					};
				}
			);

			const mockUser = {
				email: "test@test.com",
				password: "wrongPass"
			};

			const response = await request(app)
				.post("/auth/login")
				.send(mockUser);

			expect(response.status).toBe(401);
			expect(response.body).toStrictEqual({
				message: "Wrong credentials"
			});
		});
	});

	describe("User data validation testing", () => {
		describe("Registration validation", () => {
			it("Should return 422 and errors for all 4 fields", async () => {
				const mockUser = {
					email: "",
					password: "",
					firstName: "",
					lastName: ""
				};

				const response = await request(app)
					.post("/auth/register")
					.send(mockUser);

				expect(response.status).toBe(422);
				expect(response.body).toStrictEqual({
					errors: [
						{
							type: "field",
							value: "",
							msg: "Invalid email",
							path: "email",
							location: "body"
						},
						{
							type: "field",
							value: "",
							msg: "Password must be 8 characters long",
							path: "password",
							location: "body"
						},
						{
							type: "field",
							value: "",
							msg: "First name required",
							path: "firstName",
							location: "body"
						},
						{
							type: "field",
							value: "",
							msg: "Last name required",
							path: "lastName",
							location: "body"
						}
					]
				});
			});

			it("Should return 422 and invalid email", async () => {
				const mockUser = {
					email: "incorrectemailformat.com",
					password: "testPass",
					firstName: "John",
					lastName: "Doe"
				};

				const response = await request(app)
					.post("/auth/register")
					.send(mockUser);

				expect(response.status).toBe(422);
				expect(response.body).toStrictEqual({
					errors: [
						{
							type: "field",
							value: "incorrectemailformat.com",
							msg: "Invalid email",
							path: "email",
							location: "body"
						}
					]
				});
			});

			it("Should return 422 and password must be 8 characters long", async () => {
				const mockUser = {
					email: "test@test.com",
					password: "length7",
					firstName: "John",
					lastName: "Doe"
				};

				const response = await request(app)
					.post("/auth/register")
					.send(mockUser);

				expect(response.status).toBe(422);
				expect(response.body).toStrictEqual({
					errors: [
						{
							type: "field",
							value: "length7",
							msg: "Password must be 8 characters long",
							path: "password",
							location: "body"
						}
					]
				});
			});
		});

		describe("Login validation", () => {
			it("Should return 422 and errors for all 2 fields", async () => {
				const mockUser = {
					email: "",
					password: ""
				};

				const response = await request(app)
					.post("/auth/login")
					.send(mockUser);

				console.log(response.body);
				expect(response.status).toBe(422);
				expect(response.body).toStrictEqual({
					errors: [
						{
							type: "field",
							value: "",
							msg: "Invalid email",
							path: "email",
							location: "body"
						},
						{
							type: "field",
							value: "",
							msg: "Password must be 8 characters long",
							path: "password",
							location: "body"
						}
					]
				});
			});

			it("Should return 422 and invalid email", async () => {
				const mockUser = {
					email: "incorrectemailformat.com",
					password: "testPass"
				};

				const response = await request(app)
					.post("/auth/login")
					.send(mockUser);

				expect(response.status).toBe(422);
				expect(response.body).toStrictEqual({
					errors: [
						{
							type: "field",
							value: "incorrectemailformat.com",
							msg: "Invalid email",
							path: "email",
							location: "body"
						}
					]
				});
			});

			it("Should return 422 and password must be 8 characters longs", async () => {
				const mockUser = {
					email: "test@test.com",
					password: "length7"
				};

				const response = await request(app)
					.post("/auth/login")
					.send(mockUser);

				expect(response.status).toBe(422);
				expect(response.body).toStrictEqual({
					errors: [
						{
							type: "field",
							value: "length7",
							msg: "Password must be 8 characters long",
							path: "password",
							location: "body"
						}
					]
				});
			});
		});
	});
});
