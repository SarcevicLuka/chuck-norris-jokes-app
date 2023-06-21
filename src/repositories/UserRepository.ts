import { UserRegistrationData } from "../../types";
import User from "../models/User";

export class UserRepository {
	static async create(userData: UserRegistrationData) {
		const { email, password, firstName, lastName } = userData;

		const user: User = await User.create({
			email: email.toLowerCase(),
			password: password,
			firstName: firstName,
			lastName: lastName
		});

		return user;
	}
}
