import request from "supertest";
import app from "../app";
import nodemailer from "nodemailer";
import { userRepository } from "../repositories/UserRepository";
import { authService } from "../services/AuthService";
import { mailService } from "../services/MailService";

describe("Mail sending testing", () => {
	afterEach(() => {
		jest.restoreAllMocks();
	});

	it("Should return 200 and email successfuly sent", async () => {
		jest.spyOn(userRepository, "findById").mockImplementation(
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			async (id: string) => {
				return {
					id: id,
					email: "saresarac2@gmail.com",
					firstName: "John",
					lastName: "Doe"
				};
			}
		);

		const token = await authService.createJWT("radnomId");

		const response = await request(app)
			.get("/user/joke")
			.set({ Authorization: `Bearer ${token.jwt}` });

		expect(response.status).toBe(200);
		expect(response.body).toStrictEqual({
			message: "Email successfuly sent"
		});
	});

	it("Should return 404 and user not found in database", async () => {
		jest.spyOn(userRepository, "findById").mockImplementation(
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			async (id: string) => {
				return null;
			}
		);

		const token = await authService.createJWT("radnomId");

		const response = await request(app)
			.get("/user/joke")
			.set({ Authorization: `Bearer ${token.jwt}` });

		expect(response.status).toBe(404);
		expect(response.body).toStrictEqual({
			message: "User not found in database"
		});
	});

	it("Should return 500 email service error ==> transporter auth setup wrong", async () => {
		jest.spyOn(userRepository, "findById").mockImplementation(
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			async (id: string) => {
				return {
					id: id,
					email: "emaildoesnot@exist.com",
					firstName: "John",
					lastName: "Doe"
				};
			}
		);

		jest.spyOn(
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			mailService as any,
			"configureTranspoter"
		).mockImplementation(() => {
			return nodemailer.createTransport({
				service: "gmail",
				auth: {
					user: "wrong@email.com",
					pass: "wrongPass"
				}
			});
		});

		const token = await authService.createJWT("radnomId");

		const response = await request(app)
			.get("/user/joke")
			.set({ Authorization: `Bearer ${token.jwt}` });

		expect(response.status).toBe(500);
		expect(response.body).toStrictEqual({
			message: "Email service error"
		});
	});

	it("Should return 401 ==> no auth header", async () => {
		const response = await request(app).get("/user/joke");

		expect(response.status).toBe(401);
	});

	it("Should return 401 ==> no Bearer schema", async () => {
		const token = await authService.createJWT("radnomId");

		const response = await request(app)
			.get("/user/joke")
			.set({ Authorization: `${token.jwt}` });

		expect(response.status).toBe(401);
	});

	it("Should return 401 ==> no token with schema", async () => {
		const response = await request(app)
			.get("/user/joke")
			.set({ Authorization: `Bearer ` });

		expect(response.status).toBe(401);
	});

	it("Should return 403 ==> invalid token", async () => {
		const token = await authService.createJWT("radnomId");
		const invalidToken = `invalid-${token.jwt}`;

		const response = await request(app)
			.get("/user/joke")
			.set({ Authorization: `Bearer ${invalidToken}` });

		expect(response.status).toBe(403);
	});
});
