import SequelizeMock from "sequelize-mock";
import request from "supertest";
import app from "../../app";
//import server from "../../index";
import { userRepository } from "../repositories/UserRepository";
import { UserRegistrationData } from "../types";

const dbMock = new SequelizeMock(null, { logging: false });
const mockUserModel = dbMock.define("User");

//jest.mock("../repositories/UserRepository", () => {
//	const mockRepository = {
//		create: jest.fn(async (userData) => {
//			const mockUser = await mockUserModel.create({
//				email: userData.email.toLowerCase(),
//				password: userData.password,
//				firstName: userData.firstName,
//				lastName: userData.lastName
//			});
//			return Promise.resolve(mockUser);
//		})
//	};
//
//	return mockRepository;
//});

describe("User auth", () => {
	test("register user success", async () => {
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
			async (_email: string) => {
				return null;
			}
		);
		const mockUser = {
			email: "test@gmail.com",
			password: "test_pass",
			firstName: "John",
			lastName: "Doe"
		};

		const response = await request(app)
			.post("/auth/register")
			.send(mockUser);
		//console.log(response);

		expect(response.status).toBe(201);

		expect(userRepository.create).toHaveBeenCalledWith(mockUser);
	});
});
