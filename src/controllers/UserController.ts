import { Request, Response } from "express";

import { UserRegistrationData } from "../../types";
import User from "../models/User";
import { UserService as userService } from "../services/UserService";

export class UserController {
	static async register(req: Request, res: Response) {
		try {
			const body: UserRegistrationData = req.body;

			const user: User = await userService.create(body);

			return res.status(200).json(user);
		} catch (err) {
			console.log(err);
		}
	}

	static async login() {}
}
