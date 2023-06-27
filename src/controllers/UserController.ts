import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { UserLoginData, UserRegistrationData } from "../types";
import { userService } from "../services/UserService";
import { authService } from "../services/AuthService";
import { UserMapper } from "../utils/mappers/UserMapper";
import { HttpError } from "../errors/HttpError";

/**
 * @class userController
 * @classdesc controller class
 */
class UserController {
	/**
	 * @description Register user (create new user)
	 *
	 * @param {Object} req Request object containing user data: email, password, firstName, lastName
	 * @param {Object} res Response object
	 * @returns {Promise<Response>}
	 */
	async register(req: Request, res: Response): Promise<Response | undefined> {
		try {
			// Validate user data
			const errors = validationResult(req);
			if (!errors.isEmpty())
				return res.status(422).json({ errors: errors.array() });

			const userData: UserRegistrationData = req.body;

			// Check if user with given email already exists
			const existingUser = await userService.findByEmail(userData.email);
			if (existingUser) {
				return res
					.status(409)
					.json({ message: "Email already in use" });
			}

			const user = await userService.create(userData);

			const token = await authService.createJWT(user.id);

			return res
				.status(201)
				.header("Authorization", token.jwt)
				.json(user);
		} catch (error) {
			if (error instanceof HttpError) {
				console.log(error);
				return res
					.status(error.status)
					.json({ message: error.message });
			}
		}
	}

	/**
	 * @description Login user
	 *
	 * @param {Object} req Request object containing user data: email, password, firstName, lastName
	 * @param {Object} res Response object
	 * @returns {Promise<Response>}
	 */
	async login(req: Request, res: Response): Promise<Response | undefined> {
		try {
			// Validate user data
			const errors = validationResult(req);
			if (!errors.isEmpty())
				return res.status(422).json({ errors: errors.array() });

			const userData: UserLoginData = req.body;

			// Chack if user with given email exists
			const existingUser = await userService.findByEmail(userData.email);
			if (!existingUser) throw new HttpError(400, "Wrong credentials");

			// Check if password matches
			const isValid = await authService.verifyPassword(
				userData.password,
				UserMapper.mapUserModelToPasswordResponse(existingUser).password
			);

			if (!isValid) throw new HttpError(401, "Wrong credentials");

			const token = await authService.createJWT(existingUser.id);

			return res
				.status(200)
				.header("Authorization", token.jwt)
				.json(UserMapper.mapUserModelToResponse(existingUser));
		} catch (error) {
			if (error instanceof HttpError) {
				console.log(error);
				return res
					.status(error.status)
					.json({ message: error.message });
			}
		}
	}
}

const userController = new UserController();

export { userController };
