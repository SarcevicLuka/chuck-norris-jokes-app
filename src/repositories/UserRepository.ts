import { UserDataResponse, UserRegistrationData } from "../types";
import User from "../models/User";
import { UserMapper } from "../utils/mappers/UserMapper";

/**
 * @class userRepository
 * @classdesc repository for user model
 */
export class UserRepository {
	/**
	 * @description create user in the database
	 *
	 * @param {Object} userData Object containing user data: email, password, firstName, lastName
	 * @returns {Promise<UserDataResponse>} Object excluding createdAt, updatedAt and password for safety
	 */
	async create(userData: UserRegistrationData): Promise<UserDataResponse> {
		const user: User = await User.create({
			email: userData.email.toLowerCase(),
			password: userData.password,
			firstName: userData.firstName,
			lastName: userData.lastName
		});

		return UserMapper.mapUserModelToResponse(user);
	}

	/**
	 * @description find user in database by email
	 *
	 * @param {String} email User email
	 * @returns {Promise<User | null>} User from sequelize or null because it may not exist
	 */
	async findByEmail(email: string): Promise<User | null> {
		const user = await User.findOne({ where: { email } });

		if (!user) return null;
		return user;
	}

	/**
	 * @description find user in database by id
	 *
	 * @param {String} id User id
	 * @returns {Promise<User | null>} Mapped user from sequelize or null because it may not exist
	 */
	async findById(id: string): Promise<UserDataResponse | null> {
		const user = await User.findOne({ where: { id } });

		if (!user) return null;
		return UserMapper.mapUserModelToResponse(user);
	}
}

const userRepository = new UserRepository();

export { userRepository };
