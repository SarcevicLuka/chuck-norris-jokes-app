import request from "supertest";
import app from "../../app";
import { userRepository } from "../repositories/UserRepository";
import { HttpError } from "../errors/HttpError";
import { authService } from "../services/AuthService";
import { mailService } from "../services/MailService";
import { EmailMessage } from "../types";

describe("Mail sending testing", () => {
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

		//console.log(response);

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

	it("Should return 401 no authorization header", async () => {
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

		jest.spyOn(mailService, "sendMail").mockImplementation(
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			async (message: EmailMessage) => {
				throw new HttpError(500, "Email service error");
			}
		);

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
