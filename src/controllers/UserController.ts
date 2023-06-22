import { Request, Response } from "express";
import { validationResult } from "express-validator";

import { UserLoginData, UserRegistrationData } from "../../types";
import { userService } from "../services/UserService";
import { authService } from "../services/AuthService";
import { UserMapper } from "../utils/mappers/UserMapper";

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
	async register(req: Request, res: Response): Promise<Response> {
		try {
			// Validate user data
			const errors = validationResult(req);
			if (!errors.isEmpty())
				return res.status(400).json({ errors: errors.array() });

			const userData: UserRegistrationData = req.body;

			// Check if user with given email already exists
			const existingUser = await userService.findByEmail(userData.email);
			if (existingUser) {
				return res
					.status(403)
					.json({ message: "Email already in use" });
			}

			const user = await userService.create(userData);
			
			const token = authService.createJWT(user.id);

			return res
				.status(201)
				.header("Authorization", token.jwt)
				.json(user);
		} catch (errors) {
			return res.status(500).json({ message: "Something went wrong" });
		}
	}

	/**
	 * @description Login user
	 * 
	 * @param {Object} req Request object containing user data: email, password, firstName, lastName
	 * @param {Object} res Response object
	 * @returns {Promise<Response>}
	 */
	async login(req: Request, res: Response): Promise<Response> {
		try {
			// Validate user data
			const errors = validationResult(req);
			if (!errors.isEmpty())
				return res.status(400).json({ errors: errors.array() });

			const userData: UserLoginData = req.body;

			// Chack if user with given email exists
			const existingUser = await userService.findByEmail(userData.email);
			if (!existingUser)
				return res.status(401).json({ message: "Wrong credentials" });

			// Check if password matches
			const passwordCorrect: boolean = await authService.verifyPassword(
				userData.password,
				existingUser.password
			);
			if (!passwordCorrect)
				return res.status(401).json({ message: "Wrong credentials" });

			const token = authService.createJWT(existingUser.id);

			return res
				.status(200)
				.header("Authorization", token.jwt)
				.json(UserMapper.mapUserModelToResponse(existingUser));
		} catch (error) {
			return res.status(500).json({ message: "Something went wrong" });
		}
	}
}

const userController = new UserController();

export { userController };
