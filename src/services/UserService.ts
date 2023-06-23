import { UserDataResponse, UserRegistrationData } from "../../types";
import User from "../models/User";
import { userRepository } from "../repositories/UserRepository";

import bcrypt from "bcrypt";

/**
 * @class userService
 * @classdesc service for user model
 */
class UserService {
	/**
	 * @description create user in the database (call the repository)
	 *
	 * @param {Object} userData Object containing user data: email, password, firstName, lastName
	 * @returns {Promise<UserDataResponse>} Object excluding createdAt, updatedAt and password for safety
	 */
	async create(userData: UserRegistrationData): Promise<UserDataResponse> {
		const hashedPassword = await bcrypt.hash(userData.password, 10);
		userData.password = hashedPassword;

		const user: UserDataResponse = await userRepository.create(userData);

		return user;
	}

	/**
	 * @description find user in database by email (call the repository)
	 *
	 * @param {String} email User email
	 * @returns {Promise<User | null>} User from sequelize or null because it may not exist
	 */
	async findByEmail(email: string): Promise<User | null> {
		return await userRepository.findByEmail(email);
	}

	/**
	 * @description find user in database by id (call the repository)
	 *
	 * @param {String} id User id
	 * @returns {Promise<User | null>} User from sequelize or null because it may not exist
	 */
	async findById(id: string): Promise<User | null> {
		return await userRepository.findById(id);
	}
}

const userService = new UserService();

export { userService };
