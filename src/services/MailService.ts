import { EmailMessage } from "../../types";
import nodemailer from "nodemailer";
import { HttpError } from "../errors/HttpError";

/**
 * @class mailService
 * @classdesc service for sending emails
 */
class MailService {
	/**
	 * @description create and configure a nodemailer transporter
	 *
	 * @returns {Object} Transporter
	 */
	private configureTranspoter(): nodemailer.Transporter {
		const serviceEmail = process.env.SERVICE_EMAIL as string;
		const servicePass = process.env.SERVICE_PASSWORD as string;

		return nodemailer.createTransport({
			service: "gmail",
			auth: {
				user: serviceEmail,
				pass: servicePass
			}
		});
	}

	/**
	 * @description sends the given message with the configured transporter
	 *
	 * @param message {EmailMessage} message to be sent with transporter
	 * @returns {Promise<boolean>} boolean represents the success of the sendin process
	 */
	async sendMail(message: EmailMessage): Promise<boolean> {
		const transporter = this.configureTranspoter();

		const success = await transporter.sendMail(message);
		if (!success) throw new HttpError(500, "Email service error");

		return success;
	}
}

const mailService = new MailService();

export { mailService };
