import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import { Token } from "../types";
import { HttpError } from "../errors/HttpError";

/**
 * @class authService
 * @classdesc service for authentication
 */
class AuthService {
	/**
	 *
	 * @param {String} userId User id for creating JWT token
	 * @returns {Object} Token Token object containing the created JWT token
	 */
	async createJWT(userId: string): Promise<Token> {
		const jwtSecret = process.env.JWT_SECRET as string;
		const jwtLifetime = process.env.JWT_LIFETIME_IN_SECONDS;

		const token = await jwt.sign({ sub: userId }, jwtSecret, {
			expiresIn: `${jwtLifetime}s`
		});

		if (!token) throw new HttpError(500, "Error in creating JWT token");

		return { jwt: token };
	}

	/**
	 *
	 * @param {String} incomingPassword Password user is sending to the API
	 * @param {String} existingPassword Password in the database
	 * @returns {Promise<boolean>} verdict if password matches
	 */
	async verifyPassword(
		incomingPassword: string,
		existingPassword: string
	): Promise<void> {
		const isValid = await bcrypt.compare(
			incomingPassword,
			existingPassword
		);
		if (!isValid) throw new HttpError(401, "Wrong credentials");
	}
}

const authService = new AuthService();

export { authService };
