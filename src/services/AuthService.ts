import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import { Token } from "../../types";

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
	createJWT(userId: string): Token {
		const jwtSecret = process.env.JWT_SECRET;
		const jwtLifetime = process.env.JWT_LIFETIME_IN_SECONDS;
		let token = "";

		if (jwtSecret !== undefined) {
			token = jwt.sign({ sub: userId }, jwtSecret, {
				expiresIn: `${jwtLifetime}s`
			});
		}

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
	): Promise<boolean> {
		return await bcrypt.compare(incomingPassword, existingPassword);
	}
}

const authService = new AuthService();

export { authService };
