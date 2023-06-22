import { body } from "express-validator";

export const authValidation = {
	register: [
		body("email").isEmail().withMessage("Invalid email"),
		body("password").isLength({ min: 8 }).withMessage("Password must be 8 characters long"),
		body("firstName").notEmpty().withMessage("First name required"),
		body("lastName").notEmpty().withMessage("Last name required")
	],
	login: [
		body("email").isEmail().withMessage("Invalid email"),
		body("password").isLength({ min: 8 }).withMessage("Password must be 8 characters long")
	]
};
