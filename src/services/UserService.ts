import { UserRegistrationData } from "../../types";
import User from "../models/User";
import { UserRepository as userRepository } from "../repositories/UserRepository";

export class UserService {
	static async create(body: UserRegistrationData) {
		const { email, password, firstName, lastName } = body;

		const userData = {
			email,
			password,
			firstName,
			lastName
		};

		const user: User = await userRepository.create(userData);

		return user;
	}
}
