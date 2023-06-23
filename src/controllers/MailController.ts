import { Request, Response } from "express";
import { CustomRequest } from "../middleware/Auth";
import { userRepository } from "../repositories/UserRepository";
import { mailService } from "../services/MailService";
import { HttpError } from "../errors/HttpError";

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
	async send(req: Request, res: Response): Promise<Response | undefined> {
		try {
			const userId = (req as CustomRequest)?.userId as string;

			const user = await userRepository.findById(userId);
			if (!user) {
				return res
					.status(500)
					.json({ message: "User not found in database" });
			}

			const message = {
				from: "luka.sarac99@gmail.com",
				to: `${user.email}`,
				subject: "Chuck Norris joke",
				text: "Chuck Norris joke. Very very funny."
			};

			await mailService.sendMail(message);

			return res.status(200).json({ message: "Email successfuly sent" });
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

const mailController = new MailController();

export { mailController };
