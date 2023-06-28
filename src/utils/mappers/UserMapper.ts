import { UserDataPasswordResponse, UserDataResponse } from "../../types";
import User from "../../models/User";

/**
 * @class userMapper
 * @classdesc mapper for user object
 */
export class UserMapper {
	/**
	 *
	 * @param {Object} user Sequelize object
	 * @returns {Object} UserDataResponse Secure object without password, createdAt and updatedAt
	 */
	static mapUserModelToResponse(user: User): UserDataResponse {
		return {
			id: user.id,
			email: user.email,
			firstName: user.firstName,
			lastName: user.lastName
		};
	}

	/**
	 *
	 * @param {Object} user Sequelize object
	 * @returns {Object} UserDataPasswordResponse return user password that is compared during login
	 */
	static mapUserModelToPasswordResponse(
		user: User
	): UserDataPasswordResponse {
		return {
			password: user.password
		};
	}
}
