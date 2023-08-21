import { Request, Response } from "express";
import { CustomRequest } from "../middleware/Auth";
import { mailService } from "../services/MailService";
import { jokeService } from "../services/JokeService";
import { HttpError } from "../errors/HttpError";
import { userService } from "../services/UserService";

/**
 * @class mailController
 * @classdesc controller class
 */
class MailController {
	/**
	 * @description Send mail (send Chuck Norris joke to users mail)
	 *
	 * @param {Object} req Request object
	 * @param {Object} res Response object
	 * @returns {Promise<Response>}
	 */
	async sendJoke(req: Request, res: Response): Promise<void> {
		try {
			const userId = (req as CustomRequest)?.userId as string;

			const user = await userService.findById(userId);

			const joke = await jokeService.fetchJoke();
			if (!joke.jokeText) {
				throw new HttpError(500, "Error fetching joke");
			}

			const message = {
				from: process.env.SENDER_EMAIL as string,
				to: `${user.email}`,
				subject: "Chuck Norris joke",
				text: `${joke.jokeText}`
			};

			const success = mailService.sendMail(message);
			if (!success) throw new HttpError(500, "Email service error");

			res.status(200).json({ message: "Email successfuly sent" });
		} catch (error) {
			if (error instanceof HttpError) {
				console.log(error);
				res.status(error.status).json({ message: error.message });
			}
		}
	}
}

const mailController = new MailController();

export { mailController };
